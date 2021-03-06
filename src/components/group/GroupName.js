import React from 'react';
import {
  Icon,
  Header,
} from 'semantic-ui-react';
import ConfirmActionModal from '../common/ConfirmActionModal';
import GroupNameModal from '../groups/GroupNameModal';

export default function GroupName(props) {
  return (
    <>
      <ConfirmActionModal
        trigger={{
          floated: 'right',
          icon: 'delete',
          content: 'Delete',
          size: 'small',
        }}
        modal={{
          title: 'Delete Group',
          message: `Are you sure, you want to delete "${props.name}"?`,
          confirm: {
            negative: true,
            icon: 'delete',
            content: 'Delete',
            onClick: props.onDeleteClick,
          },
        }}/>
      <GroupNameModal
        trigger={{
          floated:'right',
          icon:'edit',
          size:'small',
          content:'Rename',
        }}
        modal={{
          title: 'Rename Group',
          defaultValue: props.name,
          confirm: {
            positive: true,
            icon: 'save',
            content: 'Rename',
          },
          onSubmit: props.onRenameSubmit,
          onChange: props.onNameChange,
        }}
        />
      <Header as='h1' floated='left'>
        <Icon name='group' />
        <Header.Content>
        {props.name}
        <Header.Subheader>
          Group
        </Header.Subheader>
        </Header.Content>
      </Header>
    </>
  );
}
