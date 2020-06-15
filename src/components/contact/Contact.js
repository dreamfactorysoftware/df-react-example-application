import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  Container,
  Divider,
  Header,
  Icon,
  Segment,
  Label,
  Modal,
  Button,
} from 'semantic-ui-react';
import Layout from '../layout/Layout';
import * as data from '../../services/data';
import ContactGroups from './ContactGroups';
import ContactInfo from './ContactInfo';
import EditContactModal from './EditContactModal';
import ConfirmActionModal from '../common/ConfirmActionModal';

export default function Contact() {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [contact, setContact] = useState({});
  const [contactForm, setContactForm] = useState({});
  const [contactInfo, setContactInfo] = useState();
  const [newContactInfo, setNewContactInfo] = useState({});
  const [groups, setGroups] = useState([]);
  const [groupToDelete, setGroupToDelete] = useState();

  const openConfirmDeleteGroupModal = useCallback((rowData) => {
    setGroupToDelete(rowData);
  }, []);

  const closeConfirmDeleteGroupModal = useCallback(() => setGroupToDelete(), []);

  const getData = useCallback(() => {
    setError();

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
      .catch((err) => {
        setLoading(false);
        setError(err);
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
        .catch((err) => {
          setLoading(false);
          setError(err);
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
      .catch((err) => {
        setLoading(false);
        setError(err);
      });

    setGroupToDelete();
  }, [getData, contact.contact_group_relationship_by_contact_id]);

  const handleDeleteInfoClick = useCallback((index, contactInfoToDelete) => {
    setContactInfo((info) => {
      const newInfo = info.slice();
      newInfo.splice(index, 1);
      return newInfo;
    });

    data.contact_info.delete(contactInfoToDelete.id)
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  const handleEditContactChange = useCallback((event, { name, value }) => {
    setContactForm((currentContactForm) => {
      return {
        ...currentContactForm,
        [name]: value,
      };
    });
  }, []);

  const handleEditContactSubmit = useCallback((event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setError();
    setLoading(true);

    data.contact.update(id, contactForm)
      .then(() => {
        setContact((currentContact) => ({
          ...currentContact,
          ...contactForm,
        }));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [contactForm, id]);

  const handleEditContactInfoSubmit = useCallback((event, index) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setError();
    setLoading(true);

    data.contact_info.update(contactInfo[index].id, {
      ...contactInfo[index],
      contact_id: id,
    }).then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [contactInfo, id]);

  const handleNewContactInfoSubmit = useCallback((event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setError();
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
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [newContactInfo, id]);

  const handleEditContactInfoChange = useCallback((index, name, value) => {
    setContactInfo((info) => {
      const newInfo = info.slice();
      newInfo[index][name] = value;
      return newInfo;
    });
  }, []);

  const handleNewContactInfoChange = useCallback((index, name, value) => {
    setNewContactInfo((info) => {
      return {
        ...info,
        [name]: value,
      };
    });
  }, []);

  useEffect(() => {
    getData()
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [getData]);

  return (
    <Layout loading={loading} error={error}>
      {contact && contact.first_name && (
        <>
          <Segment.Group>
            <Segment>
              <ConfirmActionModal
                trigger={{
                  floated: 'right',
                  icon: 'delete',
                  content: 'Delete',
                  size: 'small',
                }}
                modal={{
                  title: 'Delete Contact',
                  message: `Are you sure, you want to delete "${contact.first_name} ${contact.last_name}"?`,
                  confirm: {
                    negative: true,
                    icon: 'delete',
                    content: 'Delete',
                    onClick: handleDeleteContactClick,
                  },
                }} />
              <EditContactModal
                trigger={{
                  size: 'small',
                  floated: 'right',
                  icon: 'edit',
                  content: 'Edit',
                }}
                modal={{
                  title: 'Edit contact',
                  confirm: {
                    primary: true,
                    icon: 'save',
                    content: 'Save',
                  },
                  onChange: handleEditContactChange,
                  onSubmit: handleEditContactSubmit,
                }}
                contact={contact} />
              <Header as='h1' floated='left'>
                <Icon name='user' />
                <Header.Content>
                  {contact.first_name} {contact.last_name}
                </Header.Content>
              </Header>
              <Divider fitted clearing hidden />

              {contact.twitter &&
                <Label as='a' color='teal'>
                  <Icon name='twitter' />
                    Twitter
                    <Label.Detail>{contact.twitter}</Label.Detail>
                </Label>}

              {contact.skype &&
                <Label as='a' color='blue'>
                  <Icon name='skype' />
                    Skype
                    <Label.Detail>{contact.skype}</Label.Detail>
                </Label>}

              {contact.notes && (
                <>
                  <Header as='h2'>Notes</Header>
                  <Container>
                    <p>{contact.notes}</p>
                  </Container>
                </>
              )}
            </Segment>
            <ContactGroups
              onAddClick={handleAddGroupClick}
              onDeleteClick={openConfirmDeleteGroupModal}
              groups={groups} />
          </Segment.Group>

          <Divider clearing hidden />

          <ContactInfo
            data={contactInfo}
            newContactInfo={newContactInfo}
            onDeleteInfoClick={handleDeleteInfoClick}
            onEditContactInfoSubmit={handleEditContactInfoSubmit}
            onEditContactInfoChange={handleEditContactInfoChange}
            onNewContactInfoSubmit={handleNewContactInfoSubmit}
            onNewContactInfoChange={handleNewContactInfoChange} />

          {!!groupToDelete && (
            <Modal
              size='small'
              open={!!groupToDelete}
              onClose={closeConfirmDeleteGroupModal}>
              <Modal.Header>Delete Group</Modal.Header>
              <Modal.Content>
                <p>Are you sure, you want remove contact from &lsquo;{groupToDelete.name}&rsquo;?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  content='Cancel'
                  onClick={closeConfirmDeleteGroupModal}
                />
                <Button
                  negative
                  icon='delete'
                  content='Delete'
                  onClick={() => handleDeleteGroupClick(groupToDelete)}
                />
              </Modal.Actions>
            </Modal>
          )}
        </>
      )}
    </Layout>
  );
}
