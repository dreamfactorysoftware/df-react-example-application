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
import * as data from '../services/data';
import columns from '../common/contactTableColumns';
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
      data.contact_group.getOne(id),
      data.contact_group_relationship.getContactsByGroupId(id),
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
    setMessage('');
    setLoading(true);
    data.contact_group_relationship.delete(connection_id)
      .then(getData)
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  }, [getData]);

  const columnsWithActionButton = useMemo(() => columns.concat([
    {
      cell: (rowData) => {
        return (
          <TableActionButton
            data={data}
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
    setMessage('');
    setLoading(true);
    data.contact_group.delete(group.id).then(() => {
        history.push('/group');
      })
      .catch((error) => {
        setLoading(false);
        setMessage(<ErrorHandler error={error} />)
      });
  };

  const handleRenameSubmit = (event) => {
    if (group.name !== event.target.name.value) {
      setMessage('');
      setLoading(true);
      data.contact_group.update(id, event.target.name.value)
        .then(getData)
        .catch((error) => {
          setLoading(false);
          setMessage(<ErrorHandler error={error} />)
        });
    }
  };

  const handleAddClick = (selectedRows) => {
    if (selectedRows && selectedRows.length) {
      setMessage('');
      setLoading(true);
      data.contact_group_relationship.create(selectedRows.map((contact) => {
          return {
            contact_id: contact.id,
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

  useEffect(() => {
    getData();
  }, [getData]);

  const handleRowClick = (selectedRow) => {
    history.push(`/contact/${selectedRow.id}`);
  }

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
