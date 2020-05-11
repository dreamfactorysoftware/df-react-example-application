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
  Input,
  TextArea,
  Button,
  Form,
} from 'semantic-ui-react';
import Layout from './Layout';
import { contacts } from './data';

export default function ContactPage() {
  let { id } = useParams();
  const [contact, setContact] = useState();

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    return contacts.getOneWithInfo(id).then((response) => {
      setContact(response.data);
    })
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const contactForm = () => (
    <Fragment>
      <h3>Contact info</h3>
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

  return (
    <Layout>
      {contact && contactForm()}
    </Layout>
  );
}
