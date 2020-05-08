import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import Layout from './Layout'

export default function ContactPage() {
  let { id } = useParams();

  return (
    <Layout>
      <h3>Contact {id}</h3>
    </Layout>
  );
}
