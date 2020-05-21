import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import auth from '../services/auth';


export default function Login(props) {
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/contact' } };

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.authenticate(event.target.email.value, event.target.password.value).then(() => {
      history.replace(from);
    });
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment.Group>
            <Segment>
              <Header as='h2' textAlign='center'>
                Log-in to your account
              </Header>
            </Segment>
            <Segment>
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

              <Button primary fluid size='large'>
                Log in
              </Button>
            </Segment>
          </Segment.Group>
        </Form>
        <Message>
          Need an account? <a href='/register'>Register</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
