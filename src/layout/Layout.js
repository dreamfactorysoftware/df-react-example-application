import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Image,
  Menu,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import Footer from './Footer';
import LogInAndOutButton from '../common/LogInAndOutButton';
import logo from '../logo.svg';

const Layout = ({ children, active, loading, message }) =>
	(<div>
    <Menu fixed='top' inverted style={{ zIndex: 10000 }}>
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
      { message }
    	{ children }
    </Container>

    {!loading && <Footer />}
  </div>);

export default Layout;
