import React, {
  Fragment,
} from 'react';
import {
  Button,
  Header,
  Segment,
} from 'semantic-ui-react';
import NewContactInfoForm from './NewContactInfoForm';
import ContactInfoFormPlaceholder from './ContactInfoFormPlaceholder';

export default function ContactInfoFormList(props) {
  if (!props.data || !props.data.length) {
    return (<ContactInfoFormPlaceholder onAddInfoClick={props.onAddInfoClick} />);
  }

  return (
    <Fragment>
    <Header as='h2'>Info</Header>
    <Segment.Group>
      {props.data.map((contactInfoData, index) => (<NewContactInfoForm
        index={index}
        data={contactInfoData}
        onChange={props.onChange}
        onRemoveInfoClick={props.onRemoveInfoClick} />))}
    </Segment.Group>
    <Segment basic textAlign={"center"}>
      <Button
        onClick={props.onAddInfoClick}
        content='Add Info'
        icon='add'
        style={{textAlign: "center"}} />
    </Segment>
    </Fragment>
  );
}
