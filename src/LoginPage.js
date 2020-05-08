import React from "react";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import Auth from './Auth';


export default function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/contact' } };

  const handleSubmit = (event) => {
    event.preventDefault();
    Auth.authenticate(event.target.email.value, event.target.password.value).then(() => {
      history.replace(from);
    });
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid icon='user'
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
              name='password'
            />

            <Button color='blue' fluid size='large'>
              Log in
            </Button>
          </Segment>
        </Form>
        <Message>
          Need an account? <a href='/register'>Register</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
