import React, {
  Fragment,
} from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  Message,
} from 'semantic-ui-react';
import ScrollToTop from './common/ScrollToTop';
import { removeToken } from './services/auth';

export default function ErrorHandler(props) {
  const history = useHistory();

  const { status, data } = props.error.response;
  let title;
  let message;

  if  (status === 401) {
    removeToken();
    history.replace('/login');
    return null;
  }

  if (data.error && data.error.message) {
    message = data.error.message;
    title = `Error ${status}`;
  } else {
    message = 'Error';
    title = 'An unexpected error occurred.';
  }

  return (
    !!props.error &&
    <Fragment>
      <ScrollToTop />
      <Message negative>
        <Message.Header>{title}</Message.Header>
        <p>{message}</p>
      </Message>
    </Fragment>
  );
}
