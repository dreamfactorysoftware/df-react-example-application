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
} from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import { contacts } from '../services/data';
import columns from '../common/contactsTableColumns';
import Table from '../common/Table';

const SelectedElementsMessage = (props) => {
  let message;

  if (!props.selectedCount) {
    message = `Please select contacts you would like to add to "${props.groupName}" group.`;
  } else if (props.selectedCount === 1) {
    message = '1 contact selected.'
  } else {
    message = `${props.selectedCount} contacts selected.`
  }

  return (
    <Message info>
      <p>{message}</p>
    </Message>
  );
}

export default function AddContactModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState([]);
  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setSelected([]);
  }

  const setFilterDebounced = debounce(setFilter, 500);

  const handleInputChange = (event) => {
    const { target: { value } } = event;
    if (value) {
      setFilterDebounced(`(first_name like ${value}%) or (last_name like ${value}%)`);
    } else {
      setFilterDebounced('');
    }
  };

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name') => contacts.getAll({
    offset,
    limit,
    order,
    filter,
  }), [filter]);

  const handleRowSelected = ({ selectedRows }) => {
    setSelected(selectedRows);
  }

  const handleAddClick = (event) => {
    if (typeof props.onAddClick === 'function') {
      props.onAddClick(selected);
    }

    close();
  };

  return (
    <Fragment>
      <Button
        floated='right'
        icon='add user'
        content='Add contact'
        onClick={open} />
      <Modal
        centered={false}
        size='small'
        open={isOpen}
        onClose={close}>
        <Modal.Header>Add Contacts to "{props.group.name}"</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            placeholder='Search...'
            icon='search'
            size='large'
            onChange={handleInputChange} />
          <SelectedElementsMessage selectedCount={selected.length} groupName={props.group.name} />
          <Table
            columns={columns}
            defaultSortField='last_name'
            getData={getData}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            paginationServerOptions={{
              persistSelectedOnPageChange: true,
              persistSelectedOnSort: true,
            }}
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
