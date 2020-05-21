import React, {
  Fragment,
} from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import auth from './services/auth';

export default function PrivateRoute({ children, ...rest }) {
  const render = ({ location }) => {
    if (!auth.isAuthenticated) {
      return (
        <Redirect to={{ pathname: '/login', state: { from: location }}} />
      );
    }

    return (
      <Fragment>
        {children}
      </Fragment>
    )
  };

  return (
    <Route
      {...rest}
      render={render}
    />
  );
}
