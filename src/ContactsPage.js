import React, {
  useState,
  useEffect,
} from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  Loader,
} from 'semantic-ui-react';
import Layout from './Layout';
import { contacts } from './data';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'First Name',
    selector: 'first_name',
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: 'last_name',
    sortable: true,
  },
  {
    name: 'Twitter',
    selector: 'twitter',
    sortable: true,
  },
  {
    name: 'Skype',
    selector: 'skype',
    sortable: true,
  },
];

export default function ContactsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState('last_name asc');
  const history = useHistory();

  const getData = (offset = 0, limit = 10, order = 'last_name asc') => {
    setLoading(true);
    return contacts.getList({
      offset,
      limit,
      order,
    }).then((response) => {
      setData(response.data.resource);
      setTotalRows(response.data.meta.count);
      setLoading(false);
    });
  };

  const handlePageChange = (page) => {
    getData((page - 1) * rowsPerPage, rowsPerPage, sort);
  };

  const handlePerRowsChange = (currentRowsPerPage, page) => {
    getData((page - 1) * rowsPerPage, currentRowsPerPage, sort);
    setRowsPerPage(currentRowsPerPage);
  };

  const handleSort = (column, sortDirection) => {
    const currentOrder = `${column.selector} ${sortDirection}`;
    getData(0, rowsPerPage, currentOrder);
    setSort(currentOrder);
  }

  const handleRowClick = (selectedRow) => {
    history.push(`/contact/${selectedRow.id}`);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h3>Contacts</h3>
      <DataTable
        columns={columns}
        data={data}
        noHeader
        highlightOnHover
        pointerOnHover
        defaultSortField="title"
        pagination
        paginationServer
        progressPending={loading}
        progressComponent={<Loader active inline='centered' />}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSort={handleSort}
        onRowClicked={handleRowClick}
      />
    </Layout>
  );
        // paginationPerPage={rowsPerPage}
        // onChangeRowsPerPage={onChangeRowsPerPage}
}
