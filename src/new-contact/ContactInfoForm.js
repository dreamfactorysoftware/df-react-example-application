import React, {
  useState,
  useCallback,
} from 'react';
import {
  Button,
  Form,
  Input,
  Segment,
} from 'semantic-ui-react';

const options = [
  { key: 'w', text: 'Work', value: 'work' },
  { key: 'h', text: 'Home', value: 'home' },
  { key: 'm', text: 'Mobile', value: 'mobile' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function NewContact(props) {
  const [data, setData] = useState({});
  const { index, onRemoveInfoClick } = props;

  const handleRemoveInfoClick = useCallback((event) => {
    event.preventDefault();

    if (typeof onRemoveInfoClick === 'function') {
      onRemoveInfoClick(event, index);
    }
  }, [onRemoveInfoClick, index])

  const handleChange = (event, { value, name }) => {
    const newData = {
      ...data,
      [name.replace(/-\d+$/, '')]: value,
    };
    setData(newData);

    if (typeof props.onChange === 'function') {
      props.onChange(index, newData);
    }
  }

  return (
    <Segment>
      <Button
        name={`delete-${index}`}
        size='mini'
        floated='right'
        icon='delete'
        content='remove'
        onClick={handleRemoveInfoClick} />
      <Form.Select
        name={`type-${index}`}
        id='form-select-control-type'
        onChange={handleChange}
        fluid
        label='Info type'
        options={options}
        placeholder='Info type'
        value={props.data.type}
      />
      <Form.Field
        name={`address-${index}`}
        id='form-input-control-address'
        onChange={handleChange}
        control={Input}
        label='Address'
        placeholder='Address'
        value={props.data.address}
      />
      <Form.Group widths='equal'>
        <Form.Field
          name={`city-${index}`}
          id='form-input-control-city'
          onChange={handleChange}
          control={Input}
          label='City'
          placeholder='City'
          value={props.data.city}
        />
        <Form.Field
          name={`state-${index}`}
          id='form-input-control-state'
          onChange={handleChange}
          control={Input}
          label='State'
          placeholder='State'
          value={props.data.state}
        />
        <Form.Field
          name={`zip-${index}`}
          id='form-input-control-zip'
          onChange={handleChange}
          control={Input}
          label='Zip'
          placeholder='Zip'
          value={props.data.zip}
        />
      </Form.Group>
     <Form.Field
        name={`country-${index}`}
        id='form-input-control-country'
        onChange={handleChange}
        control={Input}
        label='Country'
        placeholder='Country'
        value={props.data.country}
      />
      <Form.Field
        name={`email-${index}`}
        id='form-input-control-email'
        onChange={handleChange}
        control={Input}
        label='Email'
        placeholder='Email'
        value={props.data.email}
      />
      <Form.Field
        name={`phone-${index}`}
        id='form-input-control-phone'
        onChange={handleChange}
        control={Input}
        label='Phone'
        placeholder='Phone'
        value={props.data.phone}
      />
    </Segment>
  );
}