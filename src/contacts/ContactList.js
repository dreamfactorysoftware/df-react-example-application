import React, {
  useState,
  useCallback,
} from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Button,
  Divider,
  Input,
} from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import Layout from '../layout/Layout';
import { contacts } from '../services/data';
import Table from '../common/Table';
import columns from '../common/contactsTableColumns';

export default function ContactList() {
  const history = useHistory();
  const [filter, setFilter] = useState('');

  const handleInputChange = (event) => {
    const { target: { value } } = event;
    if (value) {
      setFilterDebounced(`(first_name like ${value}%) or (last_name like ${value}%)`);
    } else {
      setFilterDebounced('');
    }
  };

  const setFilterDebounced = debounce(setFilter, 500);

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name') => contacts.getAll({
    offset,
    limit,
    order,
    filter,
  }), [filter]);

  const handleRowClick = (selectedRow) => {
    history.push(`/contact/${selectedRow.id}`);
  }

  return (
    <Layout active='contacts'>
      <Button floated='right' icon='add' content='New' as='a' href='/new-contact' />
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
