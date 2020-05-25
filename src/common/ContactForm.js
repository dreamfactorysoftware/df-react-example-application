import React, {
  Fragment,
} from 'react';
import {
  Form,
  Input,
  TextArea,
} from 'semantic-ui-react';

export default function ContactForm(props) {
  let contact = {};

  if (props.contact) {
    contact = props.contact;
  }

  return (
    <Fragment>
        <Form.Group widths='equal'>
          <Form.Field
            name='first_name'
            id='form-input-control-first-name'
            control={Input}
            label='First name'
            placeholder='First name'
            defaultValue={contact.first_name}
            required
          />
          <Form.Field
            name='last_name'
            id='form-input-control-last-name'
            control={Input}
            label='Last name'
            placeholder='Last name'
            defaultValue={contact.last_name}
            required
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            name='twitter'
            id='form-input-control-twitter'
            control={Input}
            label='Twitter'
            placeholder='Twitter'
            defaultValue={contact.twitter}
          />
          <Form.Field
            name='skype'
            id='form-input-control-skype'
            control={Input}
            label='Skype'
            placeholder='Skype'
            defaultValue={contact.skype}
          />
        </Form.Group>
        <Form.Field
          name='notes'
          id='form-textarea-control-notes'
          control={TextArea}
          label='Notes'
          placeholder='Notes'
          defaultValue={contact.notes}
        />
    </Fragment>);
  }
