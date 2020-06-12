import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Header,
  Segment,
} from 'semantic-ui-react';

export default function ContactInfoFormPlaceholder({ onAddInfoClick }) {
  return (
    <Segment placeholder>
      <Header icon>
        Address, phone, email...
      </Header>
      <Button
        onClick={onAddInfoClick}
        content='Add Info'
        icon='add' />
    </Segment>
  );
}

ContactInfoFormPlaceholder.propTypes = {
  onAddInfoClick: PropTypes.func.isRequired,
};
