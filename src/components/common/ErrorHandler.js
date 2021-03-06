import React, {
  useEffect,
  useState,
} from 'react';
import {
  Redirect,
} from 'react-router-dom';
import {
  Message,
} from 'semantic-ui-react';
import ScrollToTop from './ScrollToTop';
import { auth } from '../../services/auth';

export default function ErrorHandler({ error, redirect }) {
  const [message, setMessage] = useState([]);
  const [header, setHeader] = useState();
  const [forceRedirect, setForceRedirect] = useState(false);

  useEffect(() => {
    if (!error) {
      return;
    }

    if (!error.response) {
      setHeader('Error');

      if (error.isAxiosError) {
        setMessage(error.toJSON().message);
      }

      setMessage(['Unexpected error.']);
      return;
    }

    const { status, data } = error.response;

    if (status === 401 && redirect !== false) {
      auth.removeToken();
      setForceRedirect(true);
      return;
    }

    const parseMessages = (messages) => {
      const parser = new DOMParser();

      return messages.map((encodedStr) => {
        const dom = parser.parseFromString(
          `<!doctype html><body>${  encodedStr}`,
          'text/html');
        return dom.body.textContent;
      });
    };

    const getErrorMessages = (err) => {
      let errorMessages = [];

      if (err.message) {
        errorMessages.push(err.message);
      }

      if (err.context) {
        if (err.context.error && err.context.resource) {
          err.context.resource.forEach((item) => {
            errorMessages = errorMessages.concat(getErrorMessages(item));
          });
        } else {
          Object.values(err.context).forEach((value) => { errorMessages = errorMessages.concat(value); });
        }
      }

      return errorMessages;
    };

    setHeader(data.error && data.error.code ? `Error ${data.error.code}` : 'Error');

    if (data.error) {
      const errorMessages = parseMessages(getErrorMessages(data.error));
      setMessage(errorMessages);
    } else {
      setMessage(['Unexpected error. Please make sure APP_API_KEY and INSTANCE_URL are set in the config.js file.']);
    }
  }, [error, redirect]);

  if (!error) {
    return null;
  }

  if (forceRedirect) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <ScrollToTop />
      {message.length > 1 ? (
        <Message
          negative
          header={header}
          list={message} />
        ) : (
        <Message
          negative
          header={header}
          content={message[0]} />
      )}
    </>
  );
}
