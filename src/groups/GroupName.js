import React, {
  Fragment,
} from 'react';
import {
  Icon,
  Header,
} from 'semantic-ui-react';
import DeleteGroupModal from './DeleteGroupModal';
import GroupNameModal from './GroupNameModal';

export default function GroupName(props) {
  return (
    <Fragment>
      <DeleteGroupModal
        name={props.name}
        onDeleteClick={props.onDeleteClick} />
      <GroupNameModal
        trigger={{
          floated:'right',
          icon:'edit',
          size:'small',
          content:'Rename',
        }}
        title='Rename Group'
        modal={{
          title: 'Rename Group',
          defaultValue: props.name,
          confirm: {
            positive: true,
            icon: 'edit',
            content: 'Rename',
          },
          onSubmit: props.onRenameSubmit,
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
    </Fragment>
  );
}
