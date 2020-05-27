import React, {
  useState,
  useCallback,
  Fragment,
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
import * as data from '../services/data';
import columns from '../common/groupTableColumns';
import DataTable from 'react-data-table-component';
import ErrorHandler from '../common/ErrorHandler';

const SelectedElementsMessage = (props) => {
  let message;

  if (!props.selectedCount) {
    message = `Please select groups you would like this contact to be added to.`;
  } else if (props.selectedCount === 1) {
    message = '1 group selected.'
  } else {
    message = `${props.selectedCount} groups selected.`
  }

  return (
    <Message info>
      <p>{message}</p>
    </Message>
  );
}

export default function AddToGroupModal({ onAddClick, disabledGroups }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState([]);

  const open = () => {
    getData();
    setIsOpen(true);
  }
  const close = () => {
    setIsOpen(false);
    setSelected([]);
  }

  const setFilterDebounced = useCallback(debounce(setFilter, 500), []);

  const handleInputChange = useCallback((event) => {
    const { target: { value } } = event;

    if (value) {
      setFilterDebounced(`(name like ${value}%)`);
    } else {
      setFilterDebounced('');
    }
  }, [setFilterDebounced]);

  const getData = useCallback((offset = 0, limit = 10, order = 'name') => {
    setLoading(true);
    setMessage();
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
    .catch((error) => {
      setLoading(false);
      setMessage(<ErrorHandler error={error} />);
      setGroups([]);
    });
  }, [filter, disabledGroups]);

  const handleRowSelected = useCallback(({ selectedRows }) => {
    setSelected(selectedRows);
  }, []);

  const handleAddClick = useCallback((event) => {
    if (isFunction(onAddClick)) {
      onAddClick(selected);
    }

    close();
  }, [onAddClick, selected]);

  return (
    <Fragment>
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
          {!!message && message}
          {!message && <SelectedElementsMessage selectedCount={selected.length} />}
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
    </Fragment>);
}
