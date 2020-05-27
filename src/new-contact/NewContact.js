import React, {
  useState,
  useCallback,
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

export default function NewContact() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [contactData, setContactData] = useState({});
  const [contactInfoData, setContactInfoData] = useState([]);
  const history = useHistory();

  const handleAddInfoClick = useCallback((event) => {
    event.preventDefault();
    setContactInfoData((infoData) => infoData.concat({}));
  }, []);

  const handleRemoveInfoClick = useCallback((event, index) => {
    event.preventDefault();
    setContactInfoData((infoData) => {
      const newInfoData = infoData.slice();
      newInfoData.splice(index, 1);
      return newInfoData;
    });
  }, []);

  const handleInfoFormListChange = useCallback((index, name, value) => {
    setContactInfoData((infoData) => {
      const newInfoData = infoData.slice();
      newInfoData.splice(index, 1, {
        ...infoData[index],
        [name]: value,
      });
      return newInfoData;
    });
  }, []);

  const handleContactFormChange = useCallback((event, { value, name }) => {
    setContactData((contact) => {
      return {
        ...contact,
        [name]: value,
      };
    })
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setMessage('');
    setLoading(true);

    const contact = {
      ...contactData,
    };

    if (contactInfoData.length) {
      contact.contact_info_by_contact_id = contactInfoData;
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
  }, [history, contactData, contactInfoData]);

  return (
    <Layout loading={loading} message={message}>
      <Header as='h1'>
        <Icon name='user' />
        New Contact
      </Header>
      <Form onSubmit={handleSubmit}>
        <ContactForm
          data={contactData}
          onChange={handleContactFormChange} />
        <Divider clearing hidden />

        <ContactInfoFormList
          data={contactInfoData}
          onAddInfoClick={handleAddInfoClick}
          onRemoveInfoClick={handleRemoveInfoClick}
          onChange={handleInfoFormListChange} />
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
