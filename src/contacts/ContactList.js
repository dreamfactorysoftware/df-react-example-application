import React from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  Button,
} from 'semantic-ui-react';
import Layout from '../layout/Layout';
import { contacts } from '../services/data';
import Table from '../common/Table';
import columns from '../common/contactsTableColumns';

export default function ContactList() {
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
      <Button floated='right' icon='add' content='New' />
      <Table
        columns={columns}
        defaultSortField='last_name'
        onRowClicked={handleRowClick}
        getData={getData}
      />
    </Layout>
  );
}
