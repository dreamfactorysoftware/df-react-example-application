import React, {
  useEffect,
  useState,
  useCallback,
  Fragment,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import {
  Input,
  Button,
  Form,
  Divider, Header,
} from 'semantic-ui-react';
import DataTable from 'react-data-table-component';
import Layout from './Layout';
import { groups, contact_group_relationship } from './data';
import columns from './contactsTableColumns';

const columnsWithActionButton = columns.concat([
  {

    cell: () => <Button size='mini'>Remove</Button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
]);



export default function ContactPage() {
  let { id } = useParams();
  const [group, setGroup] = useState();
  const [groupContacts, setGroupContacts] = useState();

  const getData = useCallback((offset = 0, limit = 10, order = 'last_name asc') => {
    return Promise.all([
      groups.getOne(id),
      contact_group_relationship.getContactsByGroupId(id),
    ]).then((responses) => {
      const [{ data: group }, { data: { resource: contactsByGroupId } }] = responses;
      const groupContacts = contactsByGroupId.map((contact) => contact.contact_by_contact_id);
      setGroup(group);
      setGroupContacts(groupContacts);
    })
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const groupForm = () => (
    <Fragment>
      <Form>
        <Form.Field floated='right'
            id='form-button-control-public'
            control={Button}
            content='Save'
          />
        <Header as='h3' floated='left'>
          Group
        </Header>
        <Divider clearing hidden />
        <Form.Field
          id='form-input-control-name'
          control={Input}
          label='Name'
          placeholder='Name'
          value={group.name}
        />
      </Form>
    </Fragment>
  );

  return (
    <Layout>
      {group && group.name && groupForm()}

      {groupContacts &&
      <DataTable
        columns={columnsWithActionButton}
        data={groupContacts}
        noHeader
        defaultSortField='last_name'
        pagination
      />}
    </Layout>
  );
        // highlightOnHover
        // pointerOnHover
        // onRowClicked={props.onRowClicked}
}
