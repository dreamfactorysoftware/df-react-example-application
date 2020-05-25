import React, {
  useState,
} from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Button,
  Form,
  Divider,
  Header,
  Icon,
} from 'semantic-ui-react';
import Layout from '../layout/Layout';
import ContactForm from '../common/ContactForm';
import ContactInfoFormList from './ContactInfoFormList';
import * as data from '../services/data';
import ErrorHandler from '../common/ErrorHandler';
import formFieldNames from '../common/contactFormFieldNames';

export default function NewContact() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [infoListData, setInfoListData] = useState([]);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setMessage('');
    setLoading(true);

    const contact = {};

    formFieldNames.forEach((name) => {
      contact[name] = event.target[name].value;
    });

    if (infoListData.length) {
      contact.contact_info_by_contact_id = infoListData;
    }

    const resource = [contact];

    data.contact.create(resource)
      .then((response) => {
        const { data: { resource: [{ id }] } } = response;
        history.push(`/contact/${id}`);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }

  const handleInfoFormListChange = (newData) => {
    setInfoListData(newData);
  }

  return (
    <Layout loading={loading} message={message}>
      <Header as='h1'>
        <Icon name='user' />
        New Contact
      </Header>
      <Form onSubmit={handleSubmit}>
        <ContactForm />
        <Divider clearing hidden />

        <ContactInfoFormList onChange={handleInfoFormListChange} />
        <Divider clearing hidden />
        <Button
          primary
          content='Save'
          icon='save'
          type='submit'
          fluid
          size='large'
        />
      </Form>
    </Layout>
  );
}
