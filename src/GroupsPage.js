import React, {
  useState,
  Fragment,
} from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Modal,
} from 'semantic-ui-react';
import Layout from './Layout';
import { groups } from './data';
import Table from './Table';

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
];

const getData = (offset = 0, limit = 10, order = 'name asc') => groups.getAll({
  offset,
  limit,
  order,
});

const NewGroupModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const handleSubmit = (event) => {
    if (typeof props.onSubmit === 'function') {
      props.onSubmit(event);
    }

    setIsOpen(false);
  }

  return (
    <Fragment>
      <Button
        floated='right'
        icon='add'
        onClick={open}
        content='New' />
      <Modal
        as={Form}
        size='small'
        open={isOpen}
        onSubmit={handleSubmit}
        onClose={close}>
        <Modal.Header>Add New Group</Modal.Header>
        <Modal.Content>
          <Form.Field
            id='form-input-control-name'
            control={Input}
            label='Name'
            placeholder='Name'
            autoComplete='off'
            name='name'
            required
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='Cancel'
            onClick={close}
          />
          <Button
            positive
            icon='add'
            content='Add'
            type='submit'
          />
        </Modal.Actions>
      </Modal>
    </Fragment>);
}

export default function GroupsPage() {
  const history = useHistory();

  const handleRowClick = (selectedRow) => {
    history.push(`/group/${selectedRow.id}`);
  }

  const handleSubmit = (event) => {
    groups.create(event.target.name.value);
  }

  return (
    <Layout active='groups'>
      <h1>Groups</h1>
      <NewGroupModal onSubmit={handleSubmit} />

      <Table
        columns={columns}
        defaultSortField='name'
        onRowClicked={handleRowClick}
        getData={getData}
      />
    </Layout>
  );
}
