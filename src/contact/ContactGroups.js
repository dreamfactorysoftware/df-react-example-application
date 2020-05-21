import React from 'react';
import {
  Segment,
  Header,
  List,
  Button,
  Divider,
} from 'semantic-ui-react';
import ConfirmActionModal from '../common/ConfirmActionModal';

export default function ContactGroups(props) {
  if (!props.data) {
    return null;
  }

  const items = props.data.map((group) => (
    <List.Item>
      <List.Icon name='group' size='large' />
      <List.Content>
        <ConfirmActionModal
          trigger={{
            icon: 'remove group',
            size: 'mini',
            floated: 'right',
          }}
          modal={{
            title: 'Delete Contact',
            message: `Are you sure, you want remove contact from "${group.name}"?`,
            confirm: {
              negative: true,
              icon: 'delete',
              content: 'Delete',
              onClick: props.onDeleteGroupClick,
            },
          }}/>
        {group.name}
      </List.Content>
    </List.Item>
  ));

  return (
    <Segment>
      <Button icon='add' content='Add' floated='right' size='small' />
      <Header as='h2' floated='left'>Groups</Header>
      <Divider fitted clearing hidden />
      {items && <List relaxed>{items}</List>}
    </Segment>);
}
