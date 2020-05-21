import React, {
  useState,
} from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import {
  useHistory,
  Link,
} from "react-router-dom";
import auth from '../services/auth';
import ErrorHandler from '../common/ErrorHandler';

export default function Register() {
  let history = useHistory();
  const [message, setMessage] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.register({
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      new_password: event.target.new_password.value,
    }).then(() => {
      history.push('/contact');
    }).catch((error) => {
      setMessage(<ErrorHandler error={error} redirect={false} />);
    });
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <div style={{ textAlign: 'left' }}>{message}</div>
        <Header as='h2' attached='top'>
          Register
        </Header>
        <Form className='attached fluid segment' size='large' onSubmit={handleSubmit}>
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
        </Form>
        <Message attached='bottom' warning style={{ textAlign: 'left' }}>
          <Icon name='help' />
          Already have an account? <Link to='/login'>Log in here </Link> instead.
        </Message>
      </Grid.Column>
    </Grid>
  );
}
