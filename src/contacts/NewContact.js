import React, {
  Fragment,
} from 'react';
import {
  Button,
  Form,
  Input,
  TextArea,
  Divider,
  Header,
} from 'semantic-ui-react';
import Layout from '../layout/Layout';
import ContactForm from './ContactForm';
import ContactInfoForm from './ContactInfoForm';

export default function NewContact() {
  return (
    <Layout>
      <Header as='h1' floated='left'>New Contact</Header>
      <Button
        primary
        content='Save'
        icon='save'
        floated='right'
      />
      <ContactForm />
      <Divider clearing hidden />
      <ContactInfoForm />
    </Layout>
  );
}
