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
  useLocation,
  Link,
} from 'react-router-dom';
import auth from '../services/auth';
import ErrorHandler from '../common/ErrorHandler';

export default function Login(props) {
  const history = useHistory();
  const location = useLocation();
  const [message, setMessage] = useState();

  const { from } = location.state || { from: { pathname: '/contact' } };

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.authenticate(event.target.email.value, event.target.password.value)
      .then(() => history.replace(from))
      .catch((error) => {
        setMessage(<ErrorHandler error={error} />);
      });
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <div style={{ textAlign: 'left' }}>{message}</div>
        <Header as='h2' attached='top'>
          Log-in to your account
        </Header>
        <Form className='attached fluid segment' size='large' onSubmit={handleSubmit}>
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
        </Form>
        <Message attached='bottom' warning style={{ textAlign: 'left' }}>
          <Icon name='help' />
          Need an account? <Link to='/register'>Register here</Link>&nbsp;instead.
        </Message>
      </Grid.Column>
    </Grid>
  );
}
