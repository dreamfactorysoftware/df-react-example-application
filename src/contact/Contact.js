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

export default function Contact() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState();

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    return contacts.getOneWithInfoAndGroups(id).then((response) => {
      setContact(response.data);
      setLoading(false);
    })
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Layout loading={loading}>
      <ContactView contact={contact} />
    </Layout>
  );
}
