import React from 'react';
import {
  Segment,
  Header,
  List,
  Divider,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';
import ConfirmActionModal from '../common/ConfirmActionModal';
import AddToGroupModal from './AddToGroupModal';

export default function ContactGroups(props) {
  if (!props.groups) {
    return null;
  }

  const items = props.groups.map((group, index) => (
    <List.Item key={index}>
      <List.Icon name='group' size='large' />
      <List.Content>
        <ConfirmActionModal
          trigger={{
            icon: 'delete',
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
              onClick: () => {
                if (isFunction(props.onDeleteClick)) {
                  props.onDeleteClick(group);
                }
              },
            },
          }}/>
        {group.name}
      </List.Content>
    </List.Item>
  ));

  const disabledGroups = props.groups.map((group) => group.id);

  return (
    <Segment>
      <AddToGroupModal disabledGroups={disabledGroups} onAddClick={props.onAddClick} />
      <Header as='h2' floated='left'>Groups</Header>
      <Divider fitted clearing hidden />
      {!!items.length && <List relaxed>{items}</List>}
      {!items.length && <p>This contact doesn't belong to any group</p>}
    </Segment>);
}
