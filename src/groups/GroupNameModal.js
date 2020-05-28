import React, {
  useCallback,
  useState,
  Fragment,
} from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';

export default function GroupNameModal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback((event) => {
    event.preventDefault();
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback((event) => {
    if (isFunction(props.modal.onSubmit)) {
      props.modal.onSubmit(event);
    }

    setIsOpen(false);
  }, [props.modal]);

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
          <Form.Field
            id='form-input-control-name'
            control={Input}
            label='Name'
            placeholder='Name'
            autoComplete='off'
            name='name'
            defaultValue={props.modal.defaultValue}
            onChange={props.modal.onChange}
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
