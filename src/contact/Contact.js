import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import Layout from '../layout/Layout';
import { contacts } from '../services/data';
import ContactView from './ContactView';
import ErrorHandler from '../common/ErrorHandler';

export default function Contact() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [contact, setContact] = useState();

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    setMessage('');

    return contacts.getOneWithInfoAndGroups(id)
      .then((response) => {
        setContact(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Layout loading={loading} message={message}>
      <ContactView contact={contact} />
    </Layout>
  );
}
