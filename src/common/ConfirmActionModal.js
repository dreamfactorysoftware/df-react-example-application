import React, {
  useState,
  Fragment,
} from 'react';
import {
  Button,
  Modal,
} from 'semantic-ui-react';

export default function ConfirmActionModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const modal = Object.assign({
    cancel: {
      content: 'Cancel',
    },
    confirm: {
      icon: 'checkmark',
      content: 'Yes',
    },
  }, props.modal)

  const handleConfirmClick = () => {
    if (
      props.modal &&
      props.modal.confirm &&
      typeof props.modal.confirm.onClick === 'function'
    ) {
      props.modal.confirm.onClick();
    }

    close();
  };

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


