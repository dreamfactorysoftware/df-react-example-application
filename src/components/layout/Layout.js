import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Image,
  Menu,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import LogInAndOutButton from '../common/LogInAndOutButton';
import ErrorHandler from '../common/ErrorHandler';
import logo from '../../logo.svg';

const Layout = ({ children, active, loading, error }) =>
	(<div>
    <Menu fixed='top' style={{ zIndex: 10000 }}>
      <Container>
        <Menu.Item as={Link} to='/' header>
          <Image size='mini' src={logo} />
        </Menu.Item>
        <Menu.Item as={Link} to='/'>Home</Menu.Item>
        <Menu.Item
          as={Link}
          to='/contact'
          active={active === 'contacts'}
        >Contacts</Menu.Item>
        <Menu.Item
          as={Link}
          to='/group'
          active={active === 'groups'}
        >Groups</Menu.Item>
        <Menu.Item position='right'>
          <LogInAndOutButton />
        </Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
      <Dimmer inverted active={loading}>
        <Loader size='big' content='Loading' />
      </Dimmer>
      <ErrorHandler error={error} />
    	{ children }
    </Container>

    {!loading && <Footer />}
  </div>);

Layout.propTypes = {
  children: PropTypes.node,
  active: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

Layout.defaultProps = {
  children: null,
  active: '',
  loading: false,
  error: null,
};

export default Layout;
