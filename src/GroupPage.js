import React, {
  useCallback,
  useEffect,
  useState,
  Fragment,
} from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import {
  Icon,
  Button,
  Divider,
  Header,
  Segment,
  Modal,
  Form,
  Input,
} from 'semantic-ui-react';
import DataTable from 'react-data-table-component';
import Layout from './Layout';
import { groups, contact_group_relationship } from './data';
import columns from './contactsTableColumns';

const columnsWithActionButton = columns.concat([
  {

    cell: () => (<Button size='mini' icon='remove user' content='Remove' />),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
]);

const DeleteGroupModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleDeleteClick = (event) => {
    if (typeof props.onDeleteClick === 'function') {
      props.onDeleteClick(event);
    }

    close();
  };

  return (
    <Fragment>
      <Button
        floated='right'
        icon='delete'
        size='small'
        onClick={open} />
      <Modal
        size='small'
        open={isOpen}
        onClose={close}>
        <Modal.Header>Delete Group</Modal.Header>
          <Modal.Content>
            <p>Are you sure, you want to delete "{props.name}"?</p>
          </Modal.Content>
        <Modal.Actions>
          <Button
            content='Cancel'
            onClick={close}
          />
          <Button
            negative
            icon='delete'
            content='Delete'
            onClick={handleDeleteClick}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>);
}

const RenameGroupModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = (event) => {
    event.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = (event) => {
    if (typeof props.onRenameSubmit === 'function') {
      props.onRenameSubmit(event);
    }

    setIsOpen(false);
  };

  return (
    <Fragment>
      <Button
        floated='right'
        icon='edit'
        size='small'
        onClick={open}
        content='Rename' />
      <Modal
        as={Form}
        size='small'
        open={isOpen}
        onSubmit={handleSubmit}
        onClose={close}>
        <Modal.Header>Rename Group</Modal.Header>
        <Modal.Content>
          <Form.Field
            id='form-input-control-name'
            control={Input}
            label='Name'
            placeholder='Name'
            autoComplete='off'
            name='name'
            defaultValue={props.name}
            required
            autoFocus
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon='edit'
            content='Rename'
            type='submit'
          />
          <Button
            content='Cancel'
            onClick={close}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>);
}

const GroupName = (props) => (
  <Fragment>
    <DeleteGroupModal
      name={props.name}
      onDeleteClick={props.onDeleteClick} />
    <RenameGroupModal
      name={props.name}
      onRenameSubmit={props.onRenameSubmit} />
    <Header as='h1'>
      <Icon name='group' />
      <Header.Content>
      {props.name}
      <Header.Subheader>
        Group
      </Header.Subheader>
      </Header.Content>
    </Header>
    <Divider fitted clearing hidden />
  </Fragment>
);

export default function ContactPage() {
  let { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState();
  const [groupContacts, setGroupContacts] = useState();

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    return Promise.all([
      groups.getOne(id),
      contact_group_relationship.getContactsByGroupId(id),
    ]).then((responses) => {
      const [{ data: group }, { data: { resource: contactsByGroupId } }] = responses;
      const groupContacts = contactsByGroupId.map((contact) => contact.contact_by_contact_id);
      setGroup(group);
      setGroupContacts(groupContacts);
      setLoading(false);
    })
  }, [id]);

  const handleDeleteClick = () => {
    setLoading(true);
    groups.delete(group.id).then(() => {
      history.push('/group');
    });
  };

  const handleRenameSubmit = (event) => {
    if (group.name !== event.target.name.value) {
      setLoading(true);
      groups.update(id, event.target.name.value)
        .then(() => {
          getData();
        });
    }
  }

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <Layout loading={loading}>
      {group && group.name &&
        <GroupName
          name={group.name}
          onDeleteClick={handleDeleteClick}
          onRenameSubmit={handleRenameSubmit} />}

      {groupContacts &&
      <Segment>
        <Button floated='right'>
          <i aria-hidden="true" class="add user icon"></i>
          Add contact
        </Button>
        <DataTable
          columns={columnsWithActionButton}
          data={groupContacts}
          noHeader
          defaultSortField='last_name'
          pagination
        />
      </Segment>}
    </Layout>
  );
        // highlightOnHover
        // pointerOnHover
        // onRowClicked={props.onRowClicked}
}
