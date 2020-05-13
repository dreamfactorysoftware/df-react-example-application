import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Loader,
} from 'semantic-ui-react';
import DataTable from 'react-data-table-component';

export default function Table(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(props.defaultSortField);
  const getDataAsync = props.getData;

  const getData = useCallback((offset = 0, limit = 10, order = 'name asc') => {
    setLoading(true);
    return getDataAsync(offset, limit, order).then((response) => {
      setData(response.data.resource);
      setTotalRows(response.data.meta.count);
      setLoading(false);
    });
  }, [getDataAsync]);

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

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <DataTable
      columns={props.columns}
      data={data}
      noHeader
      highlightOnHover
      pointerOnHover
      defaultSortField={props.defaultSortField}
      pagination
      paginationServer
      progressPending={loading}
      progressComponent={<Loader active inline='centered' />}
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      onSort={handleSort}
      onRowClicked={props.onRowClicked}
    />
  );
}
