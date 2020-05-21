import React from 'react';
import {
  Button,
} from 'semantic-ui-react';
import ConfirmActionModal from './ConfirmActionModal';
import isFunction from 'lodash.isfunction';

export default function TableActionButton(props) {
  const handleButtonClick = () => {
    if (isFunction(props.onClick)) {
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
