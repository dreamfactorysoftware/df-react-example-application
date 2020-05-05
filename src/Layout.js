import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Divider, Icon } from 'semantic-ui-react';
import AuthButton from './AuthButton';

import { h1 } from './Layout.css';

const Layout = ({ children }) => {
  return (
    <Container>
      <AuthButton />
      <Link to="/">
        <Header as="h1" className={h1}>
          DreamFactory Calendar React Example Application
        </Header>
      </Link>
      {children}
      <Divider />
      <p>
        footer
      </p>
    </Container>
  );
};

export default Layout;
