import React, {
  useEffect,
  useState,
  Fragment,
} from 'react';
import {
  Redirect,
} from "react-router-dom";
import {
  Message,
} from 'semantic-ui-react';
import ScrollToTop from './ScrollToTop';
import { removeToken } from '../../services/auth';

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
      return null;
    }

    const { status, data } = error.response;

    if (status === 401 && redirect !== false) {
      removeToken();
      setForceRedirect(true);
      return;
    }

    const parseMessages = (messages) => {
      const parser = new DOMParser();

      return messages.map((encodedStr) => {
        const dom = parser.parseFromString(
          '<!doctype html><body>' + encodedStr,
          'text/html');
        return dom.body.textContent;
      });
    }

    const getErrorMessages = (error) => {
      let errorMessages = [];

      if (error.message) {
        errorMessages.push(error.message);
      }

      if (error.context) {
        if (error.context.error && error.context.resource) {
          error.context.resource.forEach((item) => {
            errorMessages = errorMessages.concat(getErrorMessages(item));
          });
        } else {
          for (const property in error.context) {
            errorMessages = errorMessages.concat(error.context[property]);
          }
        }
      }

      return errorMessages;
    }

    setHeader(data.error && data.error.code ? `Error ${data.error.code}` : 'Error');

    if (data.error) {
      let errorMessages = parseMessages(getErrorMessages(data.error));
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
    <Fragment>
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
    </Fragment>
  );
}
