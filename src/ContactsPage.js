import React from 'react';
import {
  useHistory,
} from "react-router-dom";
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
    <Layout>
      <h3>Contacts</h3>
      <Table
        columns={columns}
        defaultSortField='last_name'
        onRowClicked={handleRowClick}
        getData={getData}
      />
    </Layout>
  );
}
