import React from 'react'
import {
  Container,
  Image,
  Menu,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import Footer from './Footer';
import LogInAndOutButton from './LogInAndOutButton';
import logo from './logo.svg';

const Layout = ({ children, active, loading }) =>
	(<div>
    <Menu fixed='top' inverted style={{ zIndex: 10000 }}>
      <Container>
        <Menu.Item as='a' href='/' header>
          <Image size='mini' src={logo} />
        </Menu.Item>
        <Menu.Item as='a' href='/'>Home</Menu.Item>
        <Menu.Item
          as='a'
          href='/contact'
          active={active === 'contacts'}
        >Contacts</Menu.Item>
        <Menu.Item
          as='a'
          href='/group'
          active={active === 'groups'}
        >Groups</Menu.Item>
        <Menu.Item position='right'>
          <LogInAndOutButton />
        </Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
      <Dimmer inverted active={loading}>
        <Loader content='Loading' />
      </Dimmer>
    	{ children }
    </Container>

    <Footer />
  </div>);

export default Layout;
