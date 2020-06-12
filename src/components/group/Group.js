import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import {
  Segment,
  Divider,
  Icon,
} from 'semantic-ui-react';
import DataTable from 'react-data-table-component';
import Layout from '../layout/Layout';
import * as data from '../../services/data';
import columns from '../common/contactTableColumns';
import AddContactModal from './AddContactModal';
import ConfirmActionModal from '../common/ConfirmActionModal';
import GroupName from './GroupName';

export default function Contact() {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [group, setGroup] = useState({});
  const [newName, setNewName] = useState();
  const [groupContacts, setGroupContacts] = useState();

  const getData = useCallback(() => {
    setError();

    return Promise.all([
      data.contact_group.getOne(id),
      data.contact_group_relationship.getContactsByGroupId(id),
    ]).then((responses) => {
      const [{ data: group }, { data: { resource: contactsByGroupId } }] = responses;
      const groupContacts = contactsByGroupId.map((contact) => {
        const newContact = { ...contact.contact_by_contact_id };
        newContact.connection_id = contact.id;
        return newContact;
      });
      setGroup(group);
      setGroupContacts(groupContacts);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setError(error);
    });
  }, [id]);

  const handleRemoveContactClick = useCallback(({ connectionId }) => {
    setError();
    setLoading(true);
    data.contact_group_relationship
      .delete(connectionId)
      .then(getData)
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [getData]);

  const columnsWithActionButton = useMemo(() => columns.concat([
    {
      cell: (rowData) => {
        return (
          <ConfirmActionModal
            trigger={{
              size: 'mini',
              icon: 'remove user',
              content: 'Remove',
            }}
            modal={{
              title: 'Remove Contact',
              message: `Are you sure, you want to remove ${rowData.first_name} ${rowData.last_name} from this group?`,
              confirm: {
                negative: true,
                icon: 'remove user',
                content: 'Remove',
                onClick: () => handleRemoveContactClick(rowData),
              },
            }} />
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ]), [handleRemoveContactClick]);

  const handleDeleteClick = useCallback(() => {
    setError();
    setLoading(true);
    data.contact_group.delete(id).then(() => {
        history.push('/group');
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [id, history]);

  const handleRenameSubmit = useCallback((event) => {
    event.preventDefault();
    if (group.name !== newName) {
      setError();
      setLoading(true);
      data.contact_group.update(id, newName)
        .then(() => {
          setGroup((group) => ({
            ...group,
            name: newName,
          }));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  } , [id, group.name, newName]);

  const handleAddClick = useCallback((selectedRows) => {
    if (selectedRows && selectedRows.length) {
      setError();
      setLoading(true);
      data.contact_group_relationship.create(selectedRows.map((contact) => {
          return {
            contact_id: contact.id,
            contact_group_id: id,
          };
        }))
        .then(getData)
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  }, [id, getData]);

  const handleNameChange = useCallback((event, { value }) => {
    setNewName(value);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleRowClick = useCallback((selectedRow) => {
    history.push(`/contact/${selectedRow.id}`);
  }, [history]);

  const filterContacts = useMemo(() => groupContacts && groupContacts.map((contact) => contact.id), [groupContacts]);

  return (
    <Layout loading={loading} error={error}>
      {group &&
      <Segment.Group>
        {group.name &&
          (<Segment>
            <GroupName
              name={group.name}
              onNameChange={handleNameChange}
              onDeleteClick={handleDeleteClick}
              onRenameSubmit={handleRenameSubmit} />
            <Divider fitted clearing hidden />
          </Segment>)}

        {groupContacts &&
        <Segment>
          <AddContactModal
            groupName={group.name}
            filterContacts={filterContacts}
            onAddClick={handleAddClick} />
          <DataTable
            columns={columnsWithActionButton}
            data={groupContacts}
            noHeader
            defaultSortField='last_name'
            pagination
            highlightOnHover
            pointerOnHover
            sortIcon={<Icon name='angle down' />}
            onRowClicked={handleRowClick}
          />
        </Segment>}
      </Segment.Group>}
    </Layout>
  );
}
