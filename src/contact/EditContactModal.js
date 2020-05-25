import React, {
  useState,
  Fragment,
} from 'react';
import {
  Button,
  Modal,
  Form,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';
import ContactForm from '../common/ContactForm';

export default function EditContactModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = (event) => {
    event.preventDefault();
    setIsOpen(false);
  };
  const handleSubmit = (event) => {
    if (isFunction(props.modal.onSubmit)) {
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
        <Modal.Header>{props.modal.title}</Modal.Header>
        <Modal.Content>
          <ContactForm contact={props.contact} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon='add'
            content='Save'
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



