import React, {
  useState,
  Fragment,
} from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
} from 'semantic-ui-react';

export default function NewGroupModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = (event) => {
    event.preventDefault();
    setIsOpen(false);
  }
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
            autoFocus
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