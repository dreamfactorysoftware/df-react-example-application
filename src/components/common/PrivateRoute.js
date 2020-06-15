/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { auth } from '../../services/auth';

export default function PrivateRoute({ children, ...rest }) {
  const render = ({ location }) => {
    if (!auth.isAuthenticated) {
      return (
        <Redirect to={{ pathname: '/login', state: { from: location }}} />
      );
    }

    return (
      <>
        {children}
      </>
    );
  };

  return (
    <Route
      {...rest}
      render={render}
    />
  );
}
