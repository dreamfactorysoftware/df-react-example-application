import React from 'react';
import {
  useHistory,
} from "react-router-dom";
import Layout from './Layout';
import { groups } from './data';
import Table from './Table';

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
];

export default function GroupsPage() {
  const history = useHistory();

  const getData = (offset = 0, limit = 10, order = 'name asc') => groups.getAll({
    offset,
    limit,
    order,
  });

  const handleRowClick = (selectedRow) => {
    history.push(`/group/${selectedRow.id}`);
  }

  return (
    <Layout>
      <h3>Groups</h3>
      <Table
        columns={columns}
        defaultSortField='name'
        onRowClicked={handleRowClick}
        getData={getData}
      />
    </Layout>
  );
}
