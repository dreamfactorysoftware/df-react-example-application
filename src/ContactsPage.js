import React from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  Icon,
  Button,
} from 'semantic-ui-react';
import Layout from './Layout';
import { contacts } from './data';
import Table from './Table';
import columns from './contactsTableColumns';

export default function ContactsPage() {
  const history = useHistory();

  const getData = (offset = 0, limit = 10, order = 'last_name asc') => contacts.getAll({
    offset,
    limit,
    order,
  });

  const handleRowClick = (selectedRow) => {
    history.push(`/contact/${selectedRow.id}`);
  }

  return (
    <Layout active='contacts'>
      <h1>Contacts</h1>
      <Button floated='right'>
        <Icon name='add' />
        New
      </Button>
      <Table
        columns={columns}
        defaultSortField='last_name'
        onRowClicked={handleRowClick}
        getData={getData}
      />
    </Layout>
  );
}
