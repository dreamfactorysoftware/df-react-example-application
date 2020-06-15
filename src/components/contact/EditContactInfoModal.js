/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback,
  useState,
} from 'react';
import {
  Button,
  Modal,
  Form,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';
import ContactInfoForm from '../common/ContactInfoForm';

export default function EditContactInfoModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback((event) => {
    event.preventDefault();
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback((event) => {
    if (isFunction(props.modal.onSubmit)) {
      props.modal.onSubmit(event, props.index);
    }

    setIsOpen(false);
  }, [props.modal, props.index]);

  return (
    <>
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
          <ContactInfoForm index={props.index} data={props.data} onChange={props.modal.onChange} />
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
    </>);
}



