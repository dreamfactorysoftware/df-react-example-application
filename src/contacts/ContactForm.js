import React, {
  Fragment,
} from 'react';
import {
  Button,
  Form,
  Input,
  TextArea,
} from 'semantic-ui-react';

export default function ContactForm() {
  return (
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
    </Fragment>);
  }
