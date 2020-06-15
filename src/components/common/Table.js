/* eslint-disable react/jsx-props-no-spreading */
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
  const [offset, setOffset] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(props.defaultSortField);
  const { getData: getDataAsync, refresh } = props;

  const handlePageChange = useCallback((page) => {
    setOffset((page - 1) * rowsPerPage);
  }, [rowsPerPage]);

  const handlePerRowsChange = useCallback((currentRowsPerPage, page) => {
    setOffset((page - 1) * rowsPerPage);
    setRowsPerPage(currentRowsPerPage);
  }, [rowsPerPage]);

  const handleSort = useCallback((column, sortDirection) => {
    const currentOrder = `${column.selector} ${sortDirection}`;
    setOffset(0);
    setSort(currentOrder);
  }, []);

  useEffect(() => {
    const getData = (skip = 0, limit = 10, order) => {
      setLoading(true);
      return getDataAsync(skip, limit, order).then((response) => {
        if (response && response.data && response.data.resource) {
          setData(response.data.resource);
          setTotalRows(response.data.meta.count);
        }

        setLoading(false);
      });
    };

    getData(offset, rowsPerPage, sort);
  }, [offset, rowsPerPage, sort, getDataAsync, refresh]);

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
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePerRowsChange}
      onSort={handleSort}
      sortIcon={<Icon name='angle down' />}
      selectableRowsComponent={Checkbox}
      {...props}
    />
  );
}

