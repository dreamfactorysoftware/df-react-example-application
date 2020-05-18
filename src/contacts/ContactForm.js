import React, {
  Fragment,
} from 'react';
import {
  Button,
  Form,
  Input,
  TextArea,
  Divider,
  Header,
} from 'semantic-ui-react';

export default function ContactForm(props) {
  let contact = {};

  if (props.contact) {
    contact = props.contact;
  }

  return (
    <Fragment>
      <Divider fitted clearing hidden />
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-first-name'
            control={Input}
            label='First name'
            placeholder='First name'
            value={contact.first_name}
            required
          />
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Last name'
            placeholder='Last name'
            value={contact.last_name}
            required
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
      </Form>
    </Fragment>);
  }
