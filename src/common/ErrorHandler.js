import React, {
  useEffect,
  useState,
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
  const [message, setMessage] = useState('');
  const [header, setHeader] = useState('');

  useEffect(() => {
    const { status, data } = error.response;
    let errorMessage;
    let errorHeader;

    if  (status === 401 && redirect !== false) {
      removeToken();
      history.replace('/login');
      return null;
    }

    if (data.error) {
      if(data.error.message && data.error.context) {
        errorMessage = [];

        for (const property in data.error.context) {
          if (typeof data.error.context[property] === 'string') {
            errorMessage = errorMessage.concat(data.error.context[property]);
          }
        }

        if (errorMessage.length) {
          errorHeader = data.error.message;
        } else {
          errorMessage = data.error.message;
          errorHeader = `Error ${status}`;
        }
      } else if (data.error.message) {
        errorMessage = data.error.message;
        errorHeader = `Error ${status}`;
      } else {
        errorMessage = 'Error';
        errorHeader = 'An unexpected error occurred.';
      }

      setMessage(errorMessage);
      setHeader(errorHeader);
    }
  }, [error, history, redirect]);

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
