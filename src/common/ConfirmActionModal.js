import React, {
  useCallback,
  useState,
  Fragment,
} from 'react';
import {
  Button,
  Modal,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';

export default function ConfirmActionModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const modal = Object.assign({
    cancel: {
      content: 'Cancel',
    },
    confirm: {
      icon: 'checkmark',
      content: 'Yes',
    },
  }, props.modal);

  const handleConfirmClick = useCallback(() => {
    if (
      props.modal &&
      props.modal.confirm &&
      isFunction(props.modal.confirm.onClick)
    ) {
      props.modal.confirm.onClick();
    }

    setIsOpen(false);
  }, [props.modal]);

  return (
    <Fragment>
      <Button
        {...props.trigger}
        onClick={open} />
      <Modal
        size='small'
        open={isOpen}
        onClose={close}>
        <Modal.Header>{modal.title}</Modal.Header>
          <Modal.Content>
            <p>{modal.message}</p>
          </Modal.Content>
        <Modal.Actions>
          <Button
            {...modal.cancel}
            onClick={close}
          />
          <Button
            {...modal.confirm}
            onClick={handleConfirmClick}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>);
}


