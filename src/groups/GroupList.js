import React, {
  useState,
  useCallback,
} from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Input,
  Divider,
} from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import Layout from '../layout/Layout';
import * as data from '../services/data';
import Table from '../common/Table';
import GroupNameModal from './GroupNameModal';
import ErrorHandler from '../common/ErrorHandler';
import columns from '../common/groupTableColumns';

export default function GroupList() {
  const [refresh, setRefresh] = useState(true);
  const [message, setMessage] = useState();
  const [filter, setFilter] = useState('');
  const history = useHistory();

  const setFilterDebounced = useCallback(debounce(setFilter, 500));

  const handleInputChange = useCallback((event) => {
    const { target: { value } } = event;
    if (value) {
      setFilterDebounced(`(name like ${value}%)`);
    } else {
      setFilterDebounced('');
    }
  }, [setFilterDebounced]);

  const getData = useCallback((offset = 0, limit = 10, order = 'name asc') => {
    setMessage('');

    return data.contact_group.getAll({
      offset,
      limit,
      order,
      filter,
    }).catch((error) => setMessage(<ErrorHandler error={error} />));
  }, [filter]);


  const handleRowClick = (selectedRow) => {
    history.push(`/group/${selectedRow.id}`);
  }

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const refreshTable = () => setRefresh((refresh) => !refresh);

    data.contact_group.create(event.target.name.value)
      .then(refreshTable)
      .catch((error) => setMessage(<ErrorHandler error={error} />));
  }, []);

  return (
    <Layout active='groups' message={message}>
      <GroupNameModal
        trigger={{
          floated:'right',
          icon:'add',
          content:'New',
        }}
        modal={{
          title: 'Add New Group',
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
