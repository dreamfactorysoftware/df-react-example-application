import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import Layout from '../layout/Layout';
import * as data from '../services/data';
import ContactView from './ContactView';
import ErrorHandler from '../common/ErrorHandler';
import contactFormFieldNames from '../common/contactFormFieldNames';

export default function Contact() {
  let { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [contact, setContact] = useState();

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    setMessage('');

    return data.contact.getOneWithInfoAndGroups(id)
      .then((response) => {
        setContact(response.data);
        setLoading(false);
      });
  }, [id]);

  const handleDeleteContactClick = () => {
    setLoading(true);
    data.contact.delete(contact.id)
      .then(() => {
        history.push('/contact');
      })
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  };

  const handleAddGroupClick = (selectedRows) => {
    if (selectedRows && selectedRows.length) {
      setLoading(true);
      data.contact_group_relationship.create(selectedRows.map((group) => {
          return {
            contact_id: id,
            contact_group_id: group.id,
          };
        }))
        .then(getData)
        .catch((error) => {
          setLoading(false);
          setMessage(<ErrorHandler error={error} />)
        });
    }
  };

  const handleDeleteGroupClick = (groupToRemove) => {
    setLoading(true);
    const relationToRemove = contact.contact_group_relationship_by_contact_id.find((element) => {
      return element.contact_group_id === groupToRemove.id;
    });

    data.contact_group_relationship.delete(relationToRemove.id)
      .then(getData)
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  };

  const handleDeleteInfoClick = (contactInfoToDelete) => {
    setLoading(true);
    data.contact_info.delete(contactInfoToDelete.id)
      .then(getData)
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }

  const handleContactEditSubmit = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setMessage('');
    setLoading(true);

    const contact = {};

    contactFormFieldNames.forEach((name) => {
      contact[name] = event.target[name].value;
    });

    data.contact.update(id, contact)
      .then(getData)
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }

  const handleEditContactInfoSubmit = (event, contactInfo) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setMessage('');
    setLoading(true);

    data.contact_info.update(contactInfo.id, {
      ...contactInfo,
      contact_id: id,
    }).then(getData)
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }

  const handleNewContactInfoSubmit = (event, contactInfo) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setMessage('');
    setLoading(true);

    data.contact_info.create({
      ...contactInfo,
      contact_id: id,
    }).then(getData)
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }

  useEffect(() => {
    getData()
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }, [getData]);

  return (
    <Layout loading={loading} message={message}>
      <ContactView
        contact={contact}
        onDeleteContactClick={handleDeleteContactClick}
        onAddGroupClick={handleAddGroupClick}
        onDeleteGroupClick={handleDeleteGroupClick}
        onDeleteInfoClick={handleDeleteInfoClick}
        onContactEditSubmit={handleContactEditSubmit}
        onEditContactInfoSubmit={handleEditContactInfoSubmit}
        onNewContactInfoSubmit={handleNewContactInfoSubmit}
      />
    </Layout>
  );
}
