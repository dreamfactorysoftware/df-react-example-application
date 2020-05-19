import React, {
  Fragment,
  useState,
} from 'react';
import {
  Button,
  Header,
  Segment,
} from 'semantic-ui-react';
import ContactInfoForm from './ContactInfoForm';
import ContactInfoFormPlaceholder from './ContactInfoFormPlaceholder';

export default function ContactInfoFormList(props) {
  const [data, setData] = useState([]);

  const handleAddInfoClick = (event) => {
    event.preventDefault();
    setData(data.concat({}));
  }

  const handleRemoveInfoClick = (event, index) => {
    event.preventDefault();
    let newData = data.slice()
    newData.splice(index, 1);
    setData(newData);
  }

  const handleInfoFormChange = (index, infoData) => {
    let newData = data.slice()
    newData.splice(index, 1, { ...infoData });

    if (typeof props.onChange === 'function') {
      props.onChange(newData);
    }

    setData(newData);
  }

  const forms = [];

  if (!data.length) {
    return (<ContactInfoFormPlaceholder onAddInfoClick={handleAddInfoClick} />);
  }

  for (let i = 0; i < data.length; i += 1) {
    forms.push(<ContactInfoForm
      index={i}
      data={data[i]}
      onChange={handleInfoFormChange}
      onRemoveInfoClick={handleRemoveInfoClick}  />);
  }

  return (
    <Fragment>
    <Header as='h2'>Info</Header>
    <Segment.Group>
      {forms}
    </Segment.Group>
    <Segment basic textAlign={"center"}>
      <Button
        onClick={handleAddInfoClick}
        content='Add Info'
        icon='add'
        style={{textAlign: "center"}} />
    </Segment>
    </Fragment>
  );
}
