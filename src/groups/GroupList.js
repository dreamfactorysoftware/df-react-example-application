import React, {
  useState,
  useCallback,
} from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  Input,
  Divider,
} from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import Layout from '../layout/Layout';
import { groups } from '../services/data';
import Table from '../common/Table';
import NewGroupModal from './NewGroupModal';

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
];

export default function GroupList() {
  const [refresh, setRefresh] = useState(true);
  const history = useHistory();
  const [filter, setFilter] = useState('');

  const handleInputChange = (event) => {
    const { target: { value } } = event;
    if (value) {
      setFilterDebounced(`(name like ${value}%)`);
    } else {
      setFilterDebounced('');
    }
  };

  const setFilterDebounced = debounce(setFilter, 500);

  const getData = useCallback((offset = 0, limit = 10, order = 'name asc') => groups.getAll({
    offset,
    limit,
    order,
    filter,
  }), [filter]);

  const refreshTable = () => {
    setRefresh(!refresh);
  }

  const handleRowClick = (selectedRow) => {
    history.push(`/group/${selectedRow.id}`);
  }

  const handleSubmit = (event) => {
    groups.create(event.target.name.value)
      .then(refreshTable);
  }

  return (
    <Layout active='groups'>
      <NewGroupModal onSubmit={handleSubmit} />
      <h1>Groups</h1>
      <Divider clearing />
      <Input
        fluid
        placeholder='Search...'
        icon='search'
        size='large'
        onChange={handleInputChange} />
      <Table
        columns={columns}
        defaultSortField='name'
        onRowClicked={handleRowClick}
        getData={getData}
        refresh={refresh}
      />
    </Layout>
  );
}
