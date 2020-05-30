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
  Input,
} from 'semantic-ui-react';
import {
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';
import auth from '../../services/auth';
import ErrorHandler from '../common/ErrorHandler';

export default function Login(props) {
  const history = useHistory();
  const location = useLocation();
  const [message, setMessage] = useState();
  const [data, setData] = useState({});


  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const { from } = location.state || { from: { pathname: '/contact' } };

    auth.authenticate(data.email, data.password)
      .then(() => history.replace(from))
      .catch((error) => {
        setMessage(<ErrorHandler error={error} />);
      });
  }, [data.email, data.password, history, location.state]);

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
          Log-in to your account
        </Header>
        <Form className='attached fluid segment' style={{ textAlign: 'left' }} size='large' onSubmit={handleSubmit}>
          <Form.Field
            control={Input}
            label='E-mail address'
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
            name='email'
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            label='Password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='password'
            onChange={handleChange}
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
