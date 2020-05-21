import React, {
  Fragment,
} from 'react';
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Segment,
  Label,
} from 'semantic-ui-react';
import ContactGroups from './ContactGroups';
import ContactInfo from './ContactInfo';
import ConfirmActionModal from '../common/ConfirmActionModal';

export default function ContactView(props) {
    if (!props.contact) {
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
            <Button
              size='small'
              floated='right'
              icon='edit'
              content='Edit' />
            <Header as='h1' floated='left'>
              <Icon name='user' />
              <Header.Content>
              {props.contact.first_name} {props.contact.last_name}
              <Header.Subheader>
                Contact
              </Header.Subheader>
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
          <ContactGroups data={props.contact.contact_group_by_contact_group_relationship} />
        </Segment.Group>

        <Divider clearing hidden />

        <ContactInfo
          data={props.contact.contact_info_by_contact_id}
          onDeleteInfoClick={props.onDeleteInfoClick} />
      </Fragment>
    );
  }
