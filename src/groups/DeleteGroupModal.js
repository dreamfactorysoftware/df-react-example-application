import React, {
  useState,
} from 'react';
import ConfirmActionModal from '../common/ConfirmActionModal';

export default function DeleteGroupModal(props) {
  const handleDeleteClick = (event) => {
    if (typeof props.onDeleteClick === 'function') {
      props.onDeleteClick(event);
    }
  };

  return (
    <ConfirmActionModal
      trigger={{
        floated: 'right',
        icon: 'delete',
        size: 'small',
      }}
      modal={{
        title: 'Delete Group',
        message: `Are you sure, you want to delete "${props.name}"?`,
        confirm: {
          negative: true,
          icon: 'delete',
          content: 'Delete',
          onClick: handleDeleteClick,
        },
      }}/>);
}
