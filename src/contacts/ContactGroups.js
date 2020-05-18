import React, {
  Fragment,
} from 'react';
import {
  Header,
  List,
} from 'semantic-ui-react';

export default function ContactGroups(props) {
  if (!props.data) {
    return null;
  }

  const items = props.data.map((group) => (
    <List.Item>
      <List.Icon name='group' />
      <List.Content>{group.name}</List.Content>
    </List.Item>
  ));

  return (
    <Fragment>
      <Header as='h2'>Groups</Header>
      <List>
        {items}
      </List>
    </Fragment>);
}
