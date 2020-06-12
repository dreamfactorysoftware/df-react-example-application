import React from 'react';
import {
  Form,
  Input,
  TextArea,
} from 'semantic-ui-react';

export default function ContactForm(props) {
  return (
    <>
        <Form.Group widths='equal'>
          <Form.Field
            name='first_name'
            id='form-input-control-first-name'
            onChange={props.onChange}
            control={Input}
            label='First name'
            placeholder='First name'
            defaultValue={props.first_name}
            required
          />
          <Form.Field
            name='last_name'
            id='form-input-control-last-name'
            onChange={props.onChange}
            control={Input}
            label='Last name'
            placeholder='Last name'
            defaultValue={props.last_name}
            required
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            name='twitter'
            id='form-input-control-twitter'
            onChange={props.onChange}
            control={Input}
            label='Twitter'
            placeholder='Twitter'
            defaultValue={props.twitter}
          />
          <Form.Field
            name='skype'
            id='form-input-control-skype'
            onChange={props.onChange}
            control={Input}
            label='Skype'
            placeholder='Skype'
            defaultValue={props.skype}
          />
        </Form.Group>
        <Form.Field
          name='notes'
          id='form-textarea-control-notes'
          onChange={props.onChange}
          control={TextArea}
          label='Notes'
          placeholder='Notes'
          defaultValue={props.notes}
        />
    </>);
  }
