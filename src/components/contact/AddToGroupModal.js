import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  Button,
  Input,
  Modal,
  Message,
  Icon,
  Loader,
  Segment,
  Checkbox,
} from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import isFunction from 'lodash.isfunction';
import DataTable from 'react-data-table-component';
import * as data from '../../services/data';
import columns from '../common/groupTableColumns';
import ErrorHandler from '../common/ErrorHandler';

export default function AddToGroupModal({ onAddClick, disabledGroups }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState([]);

  const getData = useCallback((offset = 0, limit = 10, order = 'name') => {
    setLoading(true);
    setError();
    return data.contact_group.getAll({
      offset,
      limit,
      order,
      filter,
    }).then((response) => {
      if (response && response.data && response.data.resource) {
        const filteredGroups = [];

        for (let i = 0; i < response.data.resource.length; i += 1) {
          const group = response.data.resource[i];
          if ((Array.isArray(disabledGroups) ? disabledGroups : []).indexOf(group.id) === -1) {
            filteredGroups.push(group);
          }
        }

        setGroups(filteredGroups);
      }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      setError(err);
      setGroups([]);
    });
  }, [filter, disabledGroups]);

  const open = useCallback(() => {
    setGroups([]);
    getData();
    setLoading(true);
    setIsOpen(true);
  }, [getData]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelected([]);
    setFilter('');
  }, []);

  const setFilterDebounced = useCallback(debounce(setFilter, 500), []);

  const handleInputChange = useCallback((event) => {
    const { target: { value } } = event;

    setFilterDebounced(value ? `(name like ${value}%)` : '');
  }, [setFilterDebounced]);

  const handleRowSelected = useCallback(({ selectedRows }) => {
    setSelected(selectedRows);
  }, []);

  const handleAddClick = useCallback(() => {
    if (isFunction(onAddClick)) {
      onAddClick(selected);
    }

    close();
  }, [onAddClick, selected, close]);

  useEffect(() => {
    if (isOpen) {
      getData();
    }
  }, [getData, isOpen]);

  let message;

  if (!selected.length) {
    message = 'Please select groups you would like this contact to be added to.';
  } else if (selected.length === 1) {
    message = '1 group selected.';
  } else {
    message = `${selected.length} groups selected.`;
  }

  return (
    <>
      <Button
        floated='right'
        icon='add'
        content='Add'
        size='small'
        onClick={open} />
      <Modal
        centered={false}
        size='small'
        open={isOpen}
        onClose={close}>
        <Modal.Header>Select groups</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            placeholder='Search...'
            icon='search'
            size='large'
            onChange={handleInputChange} />
          {!!error && <ErrorHandler error={error} />}
          {!error && <Message info>
            <p>{message}</p>
          </Message>}
          <DataTable
            columns={columns}
            data={groups}
            noHeader
            highlightOnHover
            pointerOnHover
            pagination
            progressPending={loading}
            progressComponent={<Segment basic padded='very'><Loader active className='workaround' size='big' inline='centered' content='Loading' /></Segment>}
            sortIcon={<Icon name='angle down' />}
            selectableRows
            selectableRowsComponent={Checkbox}
            onSelectedRowsChange={handleRowSelected}
            defaultSortField='name'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='Cancel'
            onClick={close}
          />
          <Button
            positive
            icon='add user'
            content='Add'
            onClick={handleAddClick}
          />
        </Modal.Actions>
      </Modal>
    </>);
}
