import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  Button,
  Input,
  Modal,
  Checkbox,
  Icon,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import isFunction from 'lodash.isfunction';
import DataTable from 'react-data-table-component';
import * as data from '../../services/data';
import columns from '../common/contactTableColumns';
import ErrorHandler from '../common/ErrorHandler';

export default function AddContactModal({ groupName, onAddClick, filterContacts }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
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
    }).catch((err) => {
      setError(err);
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
    setFilter('');
  }, []);

  const setFilterDebounced = useCallback(debounce((nextFilter) => setFilter(nextFilter), 500), []);

  const handleInputChange = useCallback((event) => {
    const { target: { value } } = event;
    setFilterDebounced(value ? `(first_name like ${value}%) or (last_name like ${value}%)` : '');
  }, [setFilterDebounced]);

  const handleRowSelected = useCallback(({ selectedRows }) => setSelected(selectedRows), []);

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
    message = `Please select contacts you would like to add to "${groupName}" group.`;
  } else if (selected.length === 1) {
    message = '1 contact selected.';
  } else {
    message = `${selected.length} contacts selected.`;
  }

  return (
    <>
      <Button
        floated="right"
        icon="add user"
        content="Add contact"
        onClick={open}
      />
      <Modal centered={false} size="small" open={isOpen} onClose={close}>
        <Modal.Header>Add Contacts to &ldquo;{groupName}&rdquo;</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            placeholder="Search..."
            icon="search"
            size="large"
            onChange={handleInputChange}
          />
          {!!error && <ErrorHandler error={error} />}
          {!error && (
            <Message info>
              <p>{message}</p>
            </Message>
          )}
          <DataTable
            columns={columns}
            data={contacts}
            noHeader
            highlightOnHover
            pointerOnHover
            pagination
            progressPending={loading}
            progressComponent={
              <Segment basic padded="very">
                <Loader
                  active
                  className="workaround"
                  size="big"
                  inline="centered"
                  content="Loading"
                />
              </Segment>
            }
            sortIcon={<Icon name="angle down" />}
            selectableRows
            selectableRowsComponent={Checkbox}
            onSelectedRowsChange={handleRowSelected}
            defaultSortField="name"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" onClick={close} />
          <Button
            positive
            icon="add user"
            content="Add"
            onClick={handleAddClick}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
