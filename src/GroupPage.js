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
  Icon,
  Input,
  Button,
  Form,
  Divider,
  Header,
  Segment,
} from 'semantic-ui-react';
import DataTable from 'react-data-table-component';
import Layout from './Layout';
import { groups, contact_group_relationship } from './data';
import columns from './contactsTableColumns';

const columnsWithActionButton = columns.concat([
  {

    cell: () => (
      <Button size='mini'>
        <i aria-hidden="true" class="remove user icon"></i>
        Remove
      </Button>),
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

  const GroupName = (props) => (
    <Fragment>
      <Button size='small' floated='right' icon>
        <Icon name='delete' />
      </Button>
      <Button size='small' floated='right'>
        <Icon name='edit' />
        Rename
      </Button>
      <Header as='h1'>
        <Icon name='group' />
        <Header.Content>
        {props.name}
        <Header.Subheader>
          Group
        </Header.Subheader>
        </Header.Content>
      </Header>
      <Divider fitted clearing hidden />
    </Fragment>
  );

  const groupNameEditForm = () => (
    <Segment>
      <Form>
        <Form.Field
          id='form-input-control-name'
          control={Input}
          label='Group Name'
          placeholder='Name'
          value={group.name}
        />
        <Form.Field floated='right'
          id='form-button-control-public'
          control={Button}
          content='Save'
          icon='save'
          size='mini'
        />
      </Form>
      <Divider fitted clearing hidden />
    </Segment>
  );

  return (
    <Layout>
      {group && group.name && <GroupName name={group.name} />}

      {groupContacts &&
      <Segment>
        <Button floated='right'>
          <i aria-hidden="true" class="add user icon"></i>
          Add contact
        </Button>
        <DataTable
          columns={columnsWithActionButton}
          data={groupContacts}
          noHeader
          defaultSortField='last_name'
          pagination
        />
      </Segment>}
    </Layout>
  );
        // highlightOnHover
        // pointerOnHover
        // onRowClicked={props.onRowClicked}
}
