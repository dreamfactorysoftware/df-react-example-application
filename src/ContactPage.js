import React, {
  useEffect,
  useState,
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

  const getData = (offset = 0, limit = 10, order = 'last_name asc') => {
    return Promise.all([
      contacts.getOne(id),
      contacts.getInfo(id)
    ]).then((data) => {
      const [{ data: basic }, { data: { resource: more } }] = data;
      console.log(basic, more);
      setContact({
        basic,
        more,
      });
    })
  };

  useEffect(() => {
    getData();
  }, []);

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
            value={contact.basic.first_name}
          />
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Last name'
            placeholder='Last name'
            value={contact.basic.last_name}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-twitter'
            control={Input}
            label='Twitter'
            placeholder='Twitter'
            value={contact.basic.twitter}
          />
          <Form.Field
            id='form-input-control-skype'
            control={Input}
            label='Skype'
            placeholder='Skype'
            value={contact.basic.skype}
          />
        </Form.Group>
        <Form.Field
          id='form-textarea-control-notes'
          control={TextArea}
          label='Notes'
          placeholder='Notes'
          value={contact.basic.notes}
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
      {contact && contact.basic && contactForm()}
    </Layout>
  );
}
