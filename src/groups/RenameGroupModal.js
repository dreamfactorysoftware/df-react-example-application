import React, {
  useState,
  Fragment,
} from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
} from 'semantic-ui-react';

export default function RenameGroupModal(props) {
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