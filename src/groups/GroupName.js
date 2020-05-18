import React, {
  Fragment,
} from 'react';
import {
  Icon,
  Header,
} from 'semantic-ui-react';
import DeleteGroupModal from './DeleteGroupModal';
import RenameGroupModal from './RenameGroupModal';

export default function GroupName(props) {
  return (
    <Fragment>
      <DeleteGroupModal
        name={props.name}
        onDeleteClick={props.onDeleteClick} />
      <RenameGroupModal
        name={props.name}
        onRenameSubmit={props.onRenameSubmit} />
      <Header as='h1'>
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
