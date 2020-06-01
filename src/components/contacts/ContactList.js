import React, {
  useState,
  useCallback,
} from 'react';
import {
  useHistory,
  Link,
} from 'react-router-dom';
import {
  Button,
  Divider,
  Input,
} from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import Layout from '../layout/Layout';
import * as data from '../../services/data';
import Table from '../common/Table';
import columns from '../common/contactTableColumns';

export default function ContactList() {
  const history = useHistory();
  const [filter, setFilter] = useState('');
  const [error, setError] = useState();

  const setFilterDebounced = useCallback(debounce(setFilter, 500));

  const handleInputChange = useCallback((event) => {
    const { target: { value } } = event;
    if (value) {
      setFilterDebounced(`(first_name like ${value}%) or (last_name like ${value}%)`);
    } else {
      setFilterDebounced('');
    }
  }, [setFilterDebounced]);

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name') => {
    setError();

    return data.contact.getAll({
      offset,
      limit,
      order,
      filter,
    }).catch((error) => {
      setError(error);
    });
  }, [filter]);

  const handleRowClick = useCallback((selectedRow) => {
    history.push(`/contact/${selectedRow.id}`);
  }, [history]);

  return (
    <Layout active='contacts' error={error}>
      <Button floated='right' icon='add' content='New' as={Link} to='/new-contact' />
      <h1>Contacts</h1>
      <Divider clearing />
      <Input
        fluid
        placeholder='Search...'
        icon='search'
        size='large'
        onChange={handleInputChange} />
      <Table
        columns={columns}
        defaultSortField='last_name'
        onRowClicked={handleRowClick}
        getData={getData}
      />
    </Layout>
  );
}
