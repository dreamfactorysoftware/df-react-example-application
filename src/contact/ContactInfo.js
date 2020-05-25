import React, {
  Fragment,
} from 'react';
import {
  Header,
  Item,
  List,
  Segment,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';
import ConfirmActionModal from '../common/ConfirmActionModal';
import EditContactInfoModal from './EditContactInfoModal';

export default function ContactInfo(props) {
  if (!props.data) {
   return null;
  }

  const items = props.data.map((info, index) => {
    return (
      <Segment key={index}>
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
              onClick: () => {
                if (isFunction(props.onDeleteInfoClick)) {
                  props.onDeleteInfoClick(info);
                }
              },
            },
          }}/>
        <EditContactInfoModal
          trigger={{
            size: 'mini',
            floated:'right',
            icon:'edit',
            content:'Edit',
          }}
          modal={{
            title: 'Edit Contact Info',
            confirm: {
              primary: true,
              icon: 'save',
              content: 'Save',
            },
            onSubmit: props.onEditContactInfoSubmit,
          }}
          data={info}
          />
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
      {!!items.length &&
      <Fragment>
        <EditContactInfoModal
          trigger={{
            icon:'add',
            size: 'small',
            content:'New',
            floated: 'right',
            style: { marginTop: '0.6em' },
          }}
          modal={{
            title: 'Edit Contact Info',
            confirm: {
              primary: true,
              icon: 'save',
              content: 'Save',
            },
            onSubmit: props.onNewContactInfoSubmit,
          }}
          />
        <Header as='h2'>Info</Header>
        <Segment.Group>
          {items}
        </Segment.Group>
      </Fragment>}
      {!items.length &&
        <Segment basic textAlign={"center"}>
          <EditContactInfoModal
            trigger={{
              icon:'add',
              content:'Add Info',
              style: { textAlign: 'center' }
            }}
            modal={{
              title: 'Edit Contact Info',
              confirm: {
                primary: true,
                icon: 'save',
                content: 'Save',
              },
              onSubmit: props.onNewContactInfoSubmit,
            }}
            />
        </Segment>}
    </Fragment>);
  };
