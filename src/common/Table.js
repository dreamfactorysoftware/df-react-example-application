import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Loader,
  Segment,
  Icon,
  Checkbox,
} from 'semantic-ui-react';
import DataTable from 'react-data-table-component';

export default function Table(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(props.defaultSortField);
  const getDataAsync = props.getData;

  const getData = useCallback((offset = 0, limit = 10, order) => {
    setLoading(true);
    return getDataAsync(offset, limit, order).then((response) => {
      if (response && response.data && response.data.resource) {
        setData(response.data.resource);
        setTotalRows(response.data.meta.count);
      }

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
  }, [getData, props.refresh]);

  return (
    <DataTable
      data={data}
      noHeader
      highlightOnHover
      pointerOnHover
      pagination
      paginationServer
      progressPending={loading}
      progressComponent={<Segment basic padded='very'><Loader active className='workaround' size='big' inline='centered' content='Loading' /></Segment>}
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      onSort={handleSort}
      sortIcon={<Icon name='angle down' />}
      selectableRowsComponent={Checkbox}
      {...props}
    />
  );
}
