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
import GroupNameModal from './GroupNameModal';
import ErrorHandler from '../common/ErrorHandler';

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
];

export default function GroupList() {
  const [refresh, setRefresh] = useState(true);
  const [message, setMessage] = useState();

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

  const getData = useCallback((offset = 0, limit = 10, order = 'name asc') => {
    setMessage('');

    return groups.getAll({
      offset,
      limit,
      order,
      filter,
    }).catch((error) => setMessage(<ErrorHandler error={error} />));
  }, [filter]);

  const refreshTable = () => {
    setRefresh(!refresh);
  }

  const handleRowClick = (selectedRow) => {
    history.push(`/group/${selectedRow.id}`);
  }

  const handleSubmit = (event) => {
    groups.create(event.target.name.value)
      .then(refreshTable)
      .catch((error) => setMessage(<ErrorHandler error={error} />));
  }

  return (
    <Layout active='groups' message={message}>
      <GroupNameModal
        trigger={{
          floated:'right',
          icon:'add',
          content:'New',
        }}
        title='Add New Group'
        modal={{
          title: 'Rename Group',
          confirm: {
            primary: true,
            icon: 'add',
            content: 'Add',
          },
          onSubmit: handleSubmit,
        }}
        />
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
