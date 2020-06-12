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
import * as data from '../../services/data';
import Table from '../common/Table';
import GroupNameModal from './GroupNameModal';
import columns from '../common/groupTableColumns';

export default function GroupList() {
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState();
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState();
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
    setError();

    return data.contact_group.getAll({
      offset,
      limit,
      order,
      filter,
    }).catch((error) => setError(error));
  }, [filter]);


  const handleRowClick = useCallback((selectedRow) => {
    history.push(`/group/${selectedRow.id}`);
  }, [history]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const refreshTable = () => setRefresh((refresh) => !refresh);

    data.contact_group.create(newName)
      .then(() => {
        setNewName();
        refreshTable();
      })
      .catch((error) => setError(error));
  }, [newName]);

  const handleNameChange = useCallback((event, { value }) => {
    setNewName(value);
  }, []);

  return (
    <Layout active='groups' error={error}>
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
          onChange: handleNameChange,
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
