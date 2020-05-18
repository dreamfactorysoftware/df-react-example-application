import React from 'react';
import {
  Button,
} from 'semantic-ui-react';
import ConfirmActionModal from './ConfirmActionModal';

export default function TableActionButton(props) {
  const handleButtonClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick(props.data);
    }
  };

  if (!props.modal) {
    return (<Button {...props} onClick={handleButtonClick} />)
  } else {
    const confirm = Object.assign({}, props.modal.confirm, {
      onClick: handleButtonClick,
    });
    const modal = Object.assign({}, props.modal, {
      confirm,
    });

    return (
      <ConfirmActionModal {...props}
        modal={modal} />);
  }
}
