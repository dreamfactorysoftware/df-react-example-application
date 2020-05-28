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
  Checkbox,
  Icon,
  Loader,
  Segment,
} from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import isFunction from 'lodash.isfunction';
import * as data from '../services/data';
import columns from '../common/contactTableColumns';
import DataTable from 'react-data-table-component';
import ErrorHandler from '../common/ErrorHandler';

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

export default function AddContactModal({ groupName, onAddClick, filterContacts }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState([]);
  const [contacts, setContacts] = useState([]);

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name') => data.contact.getAll({
      offset,
      limit,
      order,
      filter,
    }).then((response) => {
      if (response && response.data && response.data.resource) {
        const filteredContacts = [];

        for (let i = 0; i < response.data.resource.length; i += 1) {
          const contact = response.data.resource[i];
          if ((Array.isArray(filterContacts) ? filterContacts : []).indexOf(contact.id) === -1) {
            filteredContacts.push(contact);
          }
        }

        setContacts(filteredContacts);
      }
      setLoading(false);
    }).catch((error) => {
      setMessage(<ErrorHandler error={error} />);
    }), [filter, filterContacts]);

  const open = useCallback(() => {
    setContacts([]);
    getData();
    setLoading(true);
    setIsOpen(true);
  }, [getData]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelected([]);
  }, []);

  const setFilterDebounced = useCallback(debounce(setFilter, 500), []);

  const handleInputChange = useCallback((event) => {
    const { target: { value } } = event;
    if (value) {
      setFilterDebounced(`(first_name like ${value}%) or (last_name like ${value}%)`);
    } else {
      setFilterDebounced('');
    }
  }, [setFilterDebounced]);

  const handleRowSelected = useCallback(({ selectedRows }) => setSelected(selectedRows), []);

  const handleAddClick = useCallback((event) => {
    if (isFunction(onAddClick)) {
      onAddClick(selected);
    }

    close();
  }, [onAddClick, selected, close]);

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
        <Modal.Header>Add Contacts to "{groupName}"</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            placeholder='Search...'
            icon='search'
            size='large'
            onChange={handleInputChange} />
          {!!message && message}
          {!message && <SelectedElementsMessage selectedCount={selected.length} groupName={groupName} />}
          <DataTable
            columns={columns}
            data={contacts}
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
