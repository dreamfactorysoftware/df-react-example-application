import React from "react";
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import Auth from './Auth';

export default function RegisterPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    Auth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
	  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
	    <Grid.Column style={{ maxWidth: 450 }}>
	      <Header as='h2' color='blue' textAlign='center'>
	        Register
	      </Header>
	      <Form size='large'>
	        <Segment stacked>
	          <Form.Input fluid icon='user' iconPosition='left' placeholder='First Name' />
	          <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name' />
	          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
	          <Form.Input
	            fluid
	            icon='lock'
	            iconPosition='left'
	            placeholder='Password'
	            type='password'
	          />

	          <Button color='blue' fluid size='large' onClick={login}>
	            Register
	          </Button>
	        </Segment>
	      </Form>
	    </Grid.Column>
	  </Grid>
  );
}