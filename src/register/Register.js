import React, {
  useCallback,
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
  const [data, setData] = useState({});

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    auth.register(data).then(() => {
      history.push('/contact');
    }).catch((error) => {
      setMessage(<ErrorHandler error={error} redirect={false} />);
    });
  }, [data, history]);

  const handleChange = useCallback((event, { name, value }) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }, []);

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
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='Last Name'
            name='last_name'
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
            name='email'
            onChange={handleChange}
            required
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='new_password'
            onChange={handleChange}
            required
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
