import React, {
  Fragment,
} from 'react';
import {
  Container,
  Divider,
  Header,
  Icon,
  Segment,
  Label,
} from 'semantic-ui-react';
import ContactGroups from './ContactGroups';
import ContactInfo from './ContactInfo';
import EditContactModal from './EditContactModal';
import ConfirmActionModal from '../common/ConfirmActionModal';

export default function ContactView(props) {
    if (!props.contact || !props.contact.first_name) {
      return null;
    }

    return (
      <Fragment>
        <Segment.Group>
          <Segment>
            <ConfirmActionModal
              trigger={{
                floated: 'right',
                icon: 'delete',
                content: 'Delete',
                size: 'small',
              }}
              modal={{
                title: 'Delete Contact',
                message: `Are you sure, you want to delete "${props.contact.first_name} ${props.contact.last_name}"?`,
                confirm: {
                  negative: true,
                  icon: 'delete',
                  content: 'Delete',
                  onClick: props.onDeleteContactClick,
                },
              }}/>
            <EditContactModal
              trigger={{
                size: 'small',
                floated:'right',
                icon:'edit',
                content:'Edit',
              }}
              modal={{
                title: 'Edit contact',
                confirm: {
                  primary: true,
                  icon: 'save',
                  content: 'Save',
                },
                onChange: props.onEditContactChange,
                onSubmit: props.onEditContactSubmit,
              }}
              contact={props.contact} />
            <Header as='h1' floated='left'>
              <Icon name='user' />
              <Header.Content>
              {props.contact.first_name} {props.contact.last_name}
              </Header.Content>
            </Header>
            <Divider fitted clearing hidden />

            {props.contact.twitter &&
              <Label as='a' color='teal'>
                <Icon name='twitter' />
                Twitter
                <Label.Detail>{props.contact.twitter}</Label.Detail>
              </Label>}

            {props.contact.skype &&
              <Label as='a' color='blue'>
                <Icon name='skype' />
                Skype
                <Label.Detail>{props.contact.skype}</Label.Detail>
              </Label>}

            {props.contact.notes && (
              <Fragment>
                <Header as='h2'>Notes</Header>
                <Container>
                  <p>{props.contact.notes}</p>
                </Container>
              </Fragment>
            )}
          </Segment>
          <ContactGroups
            onAddClick={props.onAddGroupClick}
            onDeleteClick={props.onDeleteGroupClick}
            groups={props.groups} />
        </Segment.Group>

        <Divider clearing hidden />

        <ContactInfo
          data={props.contactInfo}
          newContactInfo={props.newContactInfo}
          onDeleteInfoClick={props.onDeleteInfoClick}
          onEditContactInfoSubmit={props.onEditContactInfoSubmit}
          onEditContactInfoChange={props.onEditContactInfoChange}
          onNewContactInfoSubmit={props.onNewContactInfoSubmit}
          onNewContactInfoChange={props.onNewContactInfoChange} />
      </Fragment>
    );
  }
