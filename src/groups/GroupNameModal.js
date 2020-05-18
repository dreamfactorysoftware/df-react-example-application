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

export default function GroupNameModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = (event) => {
    event.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = (event) => {
    if (typeof props.modal.onSubmit === 'function') {
      props.modal.onSubmit(event);
    }

    setIsOpen(false);
  };

  return (
    <Fragment>
      <Button
        {...props.trigger}
        onClick={open} />
      <Modal
        as={Form}
        size='small'
        open={isOpen}
        onSubmit={handleSubmit}
        onClose={close}>
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Content>
          <Form.Field
            id='form-input-control-name'
            control={Input}
            label='Name'
            placeholder='Name'
            autoComplete='off'
            name='name'
            defaultValue={props.modal.defaultValue}
            required
            autoFocus
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon='add'
            content='Add'
            type='submit'
            {...props.modal.confirm}
          />
          <Button
            content='Cancel'
            onClick={close}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>);
}
