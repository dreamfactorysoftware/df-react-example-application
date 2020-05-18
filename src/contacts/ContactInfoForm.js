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

const options = [
  { key: 'w', text: 'Work', value: 'work' },
  { key: 'h', text: 'Home', value: 'home' },
  { key: 'm', text: 'Mobile', value: 'mobile' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function NewContact() {
  return (

    <Fragment>
      <Button size='mini' floated='right' icon='delete' style={{ marginTop: '1em' }} />
      <Header as='h2'>Info</Header>
      <Divider fitted clearing hidden />
      <Form>
        <Form.Select
          fluid
          label='Info type'
          options={options}
          placeholder='Info type'
        />
        <Form.Field
          id='form-input-control-twitter'
          control={Input}
          label='Address'
          placeholder='Address'
        />
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-city'
            control={Input}
            label='City'
            placeholder='City'
          />
          <Form.Field
            id='form-input-control-zip'
            control={Input}
            label='State'
            placeholder='State'
          />
          <Form.Field
            id='form-input-control-zip'
            control={Input}
            label='Zip'
            placeholder='Zip'
          />
        </Form.Group>
       <Form.Field
          id='form-input-control-country'
          control={Input}
          label='Country'
          placeholder='Country'
        />
        <Form.Field
          id='form-input-control-email'
          control={Input}
          label='Email'
          placeholder='Email'
        />
        <Form.Field
          id='form-input-control-phone'
          control={Input}
          label='Phone'
          placeholder='Phone'
        />
      </Form>
      <Divider />
      <Button
        fluid
        content='Add Info'
        icon='add'
      />
    </Fragment>
  );
}
