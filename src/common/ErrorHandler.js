import React, {
  Fragment,
} from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  Message,
} from 'semantic-ui-react';
import ScrollToTop from './ScrollToTop';
import { removeToken } from '../services/auth';

export default function ErrorHandler({ error, redirect }) {
  const history = useHistory();

  const { status, data } = error.response;
  let header;
  let message;

  if  (status === 401 && redirect !== false) {
    removeToken();
    history.replace('/login');
    return null;
  }

  if (data.error) {
    if(data.error.message && data.error.context) {
      message = [];

      for (const property in data.error.context) {
        if (typeof data.error.context[property] === 'string') {
          message = message.concat(data.error.context[property]);
        }
      }

      if (message.length) {
        header = data.error.message;
      } else {
        message = data.error.message;
        header = `Error ${status}`;
      }
    } else if (data.error.message) {
      message = data.error.message;
      header = `Error ${status}`;
    } else {
      message = 'Error';
      header = 'An unexpected error occurred.';
    }
  }

  return (
    !!error &&
    <Fragment>
      <ScrollToTop />
      {Array.isArray(message) ? (
        <Message
          negative
          header={header}
          list={message} />
        ) : (
        <Message
          negative
          header={header}
          content={message} />
      )}
    </Fragment>
  );
}
