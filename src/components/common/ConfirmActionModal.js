import React, {
  useCallback,
  useState,
} from 'react';
import {
  Button,
  Modal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';

function ConfirmActionModal({modal: propsModal, trigger}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const modal = {
    confirm: {
      icon: 'checkmark',
      content: 'Yes',
    }, ...propsModal
  };

  const handleConfirmClick = useCallback(() => {
    if (
      propsModal &&
      propsModal.confirm &&
      isFunction(propsModal.confirm.onClick)
    ) {
      propsModal.confirm.onClick();
    }

    setIsOpen(false);
  }, [propsModal]);

  return (
    <>
      <Button
        floated={trigger.floated}
        icon={trigger.icon}
        content={trigger.content}
        size={trigger.size}
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
            content='Cancel'
            onClick={close}
          />
          <Button
            content={modal.confirm.content}
            icon={modal.confirm.icon}
            onClick={handleConfirmClick}
          />
        </Modal.Actions>
      </Modal>
    </>);
}

ConfirmActionModal.propTypes = {
  modal: PropTypes.shape({
    confirm: PropTypes.shape({
      content: PropTypes.string,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    }),
  }).isRequired,
  trigger: PropTypes.shape({
    icon: PropTypes.string,
    content: PropTypes.string,
    floated: PropTypes.string,
    size: PropTypes.string,
  }).isRequired,
};

export default ConfirmActionModal;
