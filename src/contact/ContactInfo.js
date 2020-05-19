import React, {
  Fragment,
} from 'react';
import {
  Button,
  Header,
  Item,
  List,
  Segment,
} from 'semantic-ui-react';
import ConfirmActionModal from '../common/ConfirmActionModal';

export default function ContactInfo(props) {
  if (!props.data) {
   return null;
  }

  const items = props.data.map((info) => {
    return (
      <Segment>
        <ConfirmActionModal
          trigger={{
            floated: 'right',
            content: 'Delete',
            icon: 'delete',
            size: 'mini',
          }}
          modal={{
            title: 'Delete Contact',
            message: `Are you sure, you want to delete "${info.info_type}"?`,
            confirm: {
              negative: true,
              icon: 'delete',
              content: 'Delete',
              onClick: props.onDeleteInfoClick,
            },
          }}/>
        <Button size='mini' floated='right' icon='edit' content='Edit' />
        <Item>
          <Item.Content>
            <Item.Header as='h4'>{info.info_type}</Item.Header>
            <Item.Meta></Item.Meta>
            <Item.Description>
            <List>
              <List.Item>
                <List.Icon name='at' />
                <List.Content>{info.email}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='phone' />
                <List.Content>{info.phone}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='mail' />
                <List.Content>
                  <List style={{ paddingTop: 0 }}>
                    <List.Item>
                      <List.Content>{info.address}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>{info.city} {info.state} {info.zip}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>{info.country}</List.Content>
                    </List.Item>
                  </List>
                </List.Content>
              </List.Item>
            </List>
            </Item.Description>
            <Item.Extra>

            </Item.Extra>
          </Item.Content>
        </Item>
      </Segment>
    );
  });

  return (
    <Fragment>
      <Button
        floated='right'
        icon='add'
        size='small'
        style={{ marginTop: '0.6em' }}
        content='New' />
      <Header as='h2'>Info</Header>
      <Segment.Group>
        {items}
      </Segment.Group>
    </Fragment>);
  };
