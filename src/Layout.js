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
          <Image size='mini' src={logo} />
        </Menu.Item>
        <Menu.Item as='a' href='/'>Home</Menu.Item>
        <Menu.Item as='a' href='/contact'>Contacts</Menu.Item>
        <Menu.Item as='a' href='/group'>Groups</Menu.Item>
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
