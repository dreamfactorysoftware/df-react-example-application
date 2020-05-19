import React from "react";
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import {
  useHistory,
} from "react-router-dom";
import auth from '../services/auth';

export default function Register() {
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.register({
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      new_password: event.target.new_password.value,
    }).then(() => {
      history.push('/contact');
    });
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>

        <Form size='large' onSubmit={handleSubmit}>
          <Segment.Group>
            <Segment>
              <Header as='h2' color='blue' textAlign='center'>
                Register
              </Header>
            </Segment>
            <Segment>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='First Name'
                name='first_name'
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Last Name'
                name='last_name'
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                name='email'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='new_password'
              />

              <Button color='blue' fluid size='large'>
                Continue
              </Button>
            </Segment>
          </Segment.Group>
        </Form>
        <Message>
          Already have an account? <a href='/login'>Log in</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}