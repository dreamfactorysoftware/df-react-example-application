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
} from 'semantic-ui-react';
import DataTable from 'react-data-table-component';
import Layout from '../layout/Layout';
import { groups, contact_group_relationship } from '../services/data';
import columns from '../common/contactsTableColumns';
import AddContactModal from './AddContactModal';
import TableActionButton from '../common/TableActionButton';
import GroupName from './GroupName';
import ErrorHandler from '../common/ErrorHandler';

export default function Contact() {
  let { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [group, setGroup] = useState();
  const [groupContacts, setGroupContacts] = useState();

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    setMessage('');

    return Promise.all([
      groups.getOne(id),
      contact_group_relationship.getContactsByGroupId(id),
    ]).then((responses) => {
      const [{ data: group }, { data: { resource: contactsByGroupId } }] = responses;
      const groupContacts = contactsByGroupId.map((contact) => {
        contact.contact_by_contact_id.connection_id = contact.id;
        return contact.contact_by_contact_id;
      });
      setGroup(group);
      setGroupContacts(groupContacts);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setMessage(<ErrorHandler error={error} />)
    });
  }, [id]);

  const handleRemoveContactClick = useCallback(({ connection_id }) => {
    setLoading(true);
    contact_group_relationship.delete(connection_id)
      .then(getData);
  }, [getData]);

  const columnsWithActionButton = useMemo(() => columns.concat([
    {
      cell: (data) => {
        return (
          <TableActionButton
            data={data}
            trigger={{
              size: 'mini',
              icon: 'remove user',
              content: 'Remove',
            }}
            modal={{
              title: 'Delete Group',
              message: `Are you sure, you want to remove ${data.first_name} ${data.last_name} from this group?`,
              confirm: {
                negative: true,
                icon: 'remove user',
                content: 'Remove',
              },
            }}
            onClick={handleRemoveContactClick} />
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ]), [handleRemoveContactClick]);

  const handleDeleteClick = () => {
    setLoading(true);
    groups.delete(group.id).then(() => {
      history.push('/group');
    });
  };

  const handleRenameSubmit = (event) => {
    if (group.name !== event.target.name.value) {
      setLoading(true);
      groups.update(id, event.target.name.value)
        .then(getData);
    }
  };

  const handleAddClick = (selectedRows) => {
    if (selectedRows && selectedRows.length) {
      setLoading(true);
      contact_group_relationship.create(selectedRows.map((contact) => {
        return {
          contact_id: contact.id,
          contact_group_id: group.id,
        };
      })).then(getData);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Layout loading={loading} message={message}>
      {group &&
      <Segment.Group>
        {group.name &&
          (<Segment>
            <GroupName
              name={group.name}
              onDeleteClick={handleDeleteClick}
              onRenameSubmit={handleRenameSubmit} />
            <Divider fitted clearing hidden />
          </Segment>)}

        {groupContacts &&
        <Segment>
          <AddContactModal
            group={group}
            onAddClick={handleAddClick} />
          <DataTable
            columns={columnsWithActionButton}
            data={groupContacts}
            noHeader
            defaultSortField='last_name'
            pagination
          />
        </Segment>}
      </Segment.Group>}
    </Layout>
  );
        // highlightOnHover
        // pointerOnHover
        // onRowClicked={props.onRowClicked}
}
