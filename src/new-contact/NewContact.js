import React, {
  useState,
} from 'react';
import {
  Button,
  Form,
  Divider,
  Header,
} from 'semantic-ui-react';
import Layout from '../layout/Layout';
import ContactForm from './ContactForm';
import ContactInfoFormList from './ContactInfoFormList';

          // count={infoForms.length}
          // onAddInfoClick={handleAddInfoClick}
          // onRemoveInfoClick={handleRemoveInfoClick}

export default function NewContact() {
  const [infoListData, setInfoListData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.first_name.value);
    console.log(event.target.last_name.value);
    console.log(event.target.twitter.value);
    console.log(event.target.skype.value);
    console.log(event.target.notes.value);
    console.log(infoListData);
  }

  const handleInfoFormListChange = (data) => {
    setInfoListData(data);
  }

  return (
    <Layout>
      <Header as='h1'>New Contact</Header>
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
