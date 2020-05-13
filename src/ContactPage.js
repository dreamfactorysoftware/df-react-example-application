import React, {
  useEffect,
  useState,
  useCallback,
  Fragment,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Input,
  Item,
  List,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import Layout from './Layout';
import { contacts } from './data';

export default function ContactPage() {
  let { id } = useParams();
  const [contact, setContact] = useState();

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    return contacts.getOneWithInfoAndGroups(id).then((response) => {
      setContact(response.data);
    })
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const contactForm = () => (
    <Fragment>
      <h3>Edit contact</h3>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-first-name'
            control={Input}
            label='First name'
            placeholder='First name'
            value={contact.first_name}
          />
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Last name'
            placeholder='Last name'
            value={contact.last_name}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-twitter'
            control={Input}
            label='Twitter'
            placeholder='Twitter'
            value={contact.twitter}
          />
          <Form.Field
            id='form-input-control-skype'
            control={Input}
            label='Skype'
            placeholder='Skype'
            value={contact.skype}
          />
        </Form.Group>
        <Form.Field
          id='form-textarea-control-notes'
          control={TextArea}
          label='Notes'
          placeholder='Notes'
          value={contact.notes}
        />
        <Form.Field
          id='form-button-control-public'
          control={Button}
          content='Confirm'
        />
      </Form>
    </Fragment>
  );

  const contactInfoView = (contactInfo) => {
    if (!contactInfo) {
     return;
    }

    const items = contactInfo.map((info) => {
      return (
        <Segment>
          <Button size='mini' floated='right' icon>
            <Icon name='delete' />
          </Button>
          <Button size='mini' floated='right'>
            <Icon name='edit' />
            Edit
          </Button>
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
      <Item.Group>
        {items}
      </Item.Group>);
  };

  const contactGroups = (groups) => {
    const items = groups.map((group) => (
      <List.Item>
        <List.Icon name='group' />
        <List.Content>{group.name}</List.Content>
      </List.Item>
    ));

    return (
      <List>
        {items}
      </List>);
  }

  const contactView = (contact) => (
    <Fragment>
      <Button size='small' floated='right' icon>
        <Icon name='delete' />
      </Button>
      <Button size='small' floated='right'>
        <Icon name='edit' />
        Edit
      </Button>
      <Header as='h1'>
        <Icon name='user' />
        <Header.Content>
        {contact.first_name} {contact.last_name}
        <Header.Subheader>
          Contact
        </Header.Subheader>
        </Header.Content>
      </Header>
      <Divider fitted clearing hidden />

      <List>
        <List.Item>
          <List.Icon name='skype' />
          <List.Content>{contact.skype}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='user circle' />
          <List.Content>{contact.twitter}</List.Content>
        </List.Item>
      </List>

      <Header as='h2'>Notes</Header>
      <Container>
        <p>Jakieś notatki na temat tej osoby.</p>
      </Container>

      <Header as='h2'>Groups</Header>
      {contact.contact_group_by_contact_group_relationship &&
        contactGroups(contact.contact_group_by_contact_group_relationship)}

      <Header as='h2'>Info</Header>
      {contactInfoView(contact.contact_info_by_contact_id)}
    </Fragment>
  );

  return (
    <Layout>
      {contact && contactView(contact)}
    </Layout>
  );
}
