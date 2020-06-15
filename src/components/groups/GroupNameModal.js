import React, {
  useCallback,
  useState,
} from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';

export default function GroupNameModal({ trigger, modal }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback((event) => {
    event.preventDefault();
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback((event) => {
    if (isFunction(modal.onSubmit)) {
      modal.onSubmit(event);
    }

    setIsOpen(false);
  }, [modal]);

  return (
    <>
      <Button
        floated={trigger.floated}
        icon={trigger.icon}
        size={trigger.size}
        content={trigger.content}
        onClick={open} />
      <Modal
        as={Form}
        size='small'
        open={isOpen}
        onSubmit={handleSubmit}
        onClose={close}>
        <Modal.Header>{modal.title}</Modal.Header>
        <Modal.Content>
          <Form.Field
            id='form-input-control-name'
            control={Input}
            label='Name'
            placeholder='Name'
            autoComplete='off'
            name='name'
            defaultValue={modal.defaultValue}
            onChange={modal.onChange}
            required
            autoFocus
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='submit'
            positive={modal.confirm.positive}
            primary={modal.confirm.primary}
            icon={modal.confirm.icon}
            content={modal.confirm.content}
          />
          <Button
            content='Cancel'
            onClick={close}
          />
        </Modal.Actions>
      </Modal>
    </>);
}
