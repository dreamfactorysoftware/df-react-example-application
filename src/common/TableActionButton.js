import React, {
  useCallback,
} from 'react';
import {
  Button,
} from 'semantic-ui-react';
import ConfirmActionModal from './ConfirmActionModal';
import isFunction from 'lodash.isfunction';

export default function TableActionButton(props) {
  const { onClick, data } = props;
  const handleButtonClick = useCallback(() => {
    if (isFunction(onClick)) {
      onClick(data);
    }
  }, [onClick, data]);

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
