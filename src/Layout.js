import React from 'react'
import {
  Container,
  Image,
  Menu,
} from 'semantic-ui-react';
import Footer from './Footer';
import LogInAndOutButton from './LogInAndOutButton';
import logo from './logo.svg';

const Layout = ({ children }) =>
	(<div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' href='/' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          DreamFactory Calendar
        </Menu.Item>
        <Menu.Item as='a' href='/'>Home</Menu.Item>
        <Menu.Item as='a' href='/contacts'>Contacts</Menu.Item>
        <Menu.Item as='a' href='/groups'>Groups</Menu.Item>
        <Menu.Item position='right'>
          <LogInAndOutButton />
        </Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
    	{ children }
    </Container>

    <Footer />
  </div>);

export default Layout;
