import React from 'react';
import {
  Segment,
  Header,
  List,
  Divider,
  Button,
} from 'semantic-ui-react';
import AddToGroupModal from './AddToGroupModal';

export default function ContactGroups(props) {
  if (!props.groups) {
    return null;
  }

  const items = props.groups.map((group) => (
    <List.Item key={group.id}>
      <List.Icon name="group" size="large" />
      <List.Content>
        <Button
          icon='delete'
          size='mini'
          floated='right'
          onClick={() => props.onDeleteClick(group)}
        />
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
      {!items.length && <p>This contact does not belong to any group</p>}
    </Segment>);
}
