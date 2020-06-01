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
import { removeToken } from '../../services/auth';

export default function ErrorHandler({ error, redirect }) {
  const history = useHistory();
  const [message, setMessage] = useState([]);
  const [header, setHeader] = useState();

  useEffect(() => {
    if (!error) {
      return null;
    }

    const { status, data } = error.response;

    if  (status === 401 && redirect !== false) {
      removeToken();
      history.replace('/login');
      return null;
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

    if (data.error) {
      let errorMessages = parseMessages(getErrorMessages(data.error));
      setMessage(errorMessages);
      setHeader(data.error.code ? `Error ${data.error.code}` : 'Error');
    } else {

    }
  }, [error, history, redirect]);

  return (
    !!error &&
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
