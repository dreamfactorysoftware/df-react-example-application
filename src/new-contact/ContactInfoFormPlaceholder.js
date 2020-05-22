import React from 'react';
import {
  Button,
  Header,
  Segment,
} from 'semantic-ui-react';

export default function ContactInfoFormPlaceholder(props) {
  return (
    <Segment placeholder>
      <Header icon>
        Address, phone, email...
      </Header>
      <Button
        onClick={props.onAddInfoClick}
        content='Add Info'
        icon='add' />
    </Segment>
  );
}
