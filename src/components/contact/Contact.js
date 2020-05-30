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
import * as data from '../../services/data';
import ContactView from './ContactView';
import ErrorHandler from '../common/ErrorHandler';

export default function Contact() {
  let { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [contact, setContact] = useState({});
  const [contactForm, setContactForm] = useState({});
  const [contactInfo, setContactInfo] = useState();
  const [newContactInfo, setNewContactInfo] = useState({});
  const [groups, setGroups] = useState([]);

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    setMessage('');

    return data.contact.getOneWithInfoAndGroups(id)
      .then((response) => {
        setContact(response.data);
        setContactInfo(response.data.contact_info_by_contact_id);
        setGroups(response.data.contact_group_by_contact_group_relationship);
        setLoading(false);
      });
  }, [id]);

  const handleDeleteContactClick = useCallback(() => {
    setLoading(true);
    data.contact.delete(id)
      .then(() => {
        history.push('/contact');
      })
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }, [history, id]);

  const handleAddGroupClick = useCallback((selectedRows) => {
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
  }, [id, getData]);

  const handleDeleteGroupClick = useCallback((groupToRemove) => {
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
  }, [getData, contact.contact_group_relationship_by_contact_id]);

  const handleDeleteInfoClick = useCallback((index, contactInfoToDelete) => {
    setContactInfo((info) => {
      const newInfo = info.slice();
      newInfo.splice(index, 1);
      return newInfo;
    });

    data.contact_info.delete(contactInfoToDelete.id)
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }, []);

  const handleEditContactChange = useCallback((event, { name, value }) => {
    setContactForm((contactForm) => {
      return {
        ...contactForm,
        [name]: value,
      };
    })
  }, []);

  const handleContactEditSubmit = useCallback((event) => {
    event.preventDefault();
    console.log(contactForm);
    window.scrollTo(0, 0);
    setMessage('');
    setLoading(true);

    data.contact.update(id, contactForm)
      .then(() => {
        setContact((contact) => ({
          ...contact,
          ...contactForm,
        }));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }, [contactForm, id]);

  const handleEditContactInfoSubmit = useCallback((event, index) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setMessage('');
    setLoading(true);

    data.contact_info.update(contactInfo[index].id, {
      ...contactInfo[index],
      contact_id: id,
    }).then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }, [contactInfo, id]);

  const handleNewContactInfoSubmit = useCallback((event, index) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setMessage('');
    setLoading(true);

    data.contact_info.create({
      ...newContactInfo,
      contact_id: id,
    }).then((response) => {
        setContactInfo((info) => {
          const newInfo = info.slice();
          newInfo.push({
            ...newContactInfo,
            id: response.data.resource[0].id,
          });
          return newInfo;
        });
        setNewContactInfo({});
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }, [newContactInfo, id]);

  const handleEditContactInfoChange = useCallback((index, name, value) => {
    setContactInfo((info) => {
      const newInfo = info.slice();
      newInfo[index][name] = value;
      return newInfo;
    })
  }, []);

  const handleNewContactInfoChange = useCallback((index, name, value) => {
    setNewContactInfo((info) => {
      return {
        ...info,
        [name]: value,
      };
    })
  }, []);

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
        contactInfo={contactInfo}
        newContactInfo={newContactInfo}
        groups={groups}
        onDeleteContactClick={handleDeleteContactClick}
        onAddGroupClick={handleAddGroupClick}
        onDeleteGroupClick={handleDeleteGroupClick}
        onDeleteInfoClick={handleDeleteInfoClick}
        onEditContactChange={handleEditContactChange}
        onEditContactSubmit={handleContactEditSubmit}
        onEditContactInfoSubmit={handleEditContactInfoSubmit}
        onEditContactInfoChange={handleEditContactInfoChange}
        onNewContactInfoSubmit={handleNewContactInfoSubmit}
        onNewContactInfoChange={handleNewContactInfoChange}
      />
    </Layout>
  );
}
