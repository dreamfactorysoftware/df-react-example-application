import React, {
  useState,
  Fragment,
} from 'react';
import {
  Form,
  Input,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';

const options = [
  { key: 'w', text: 'Work', value: 'work' },
  { key: 'h', text: 'Home', value: 'home' },
  { key: 'm', text: 'Mobile', value: 'mobile' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function ContactInfoForm(props) {
  const [contactInfo, setContactInfo] = useState({});
  let { index } = props;

  if (typeof index !== 'number') {
    index = 0;
  }

  let data = {};

  if (props.data) {
    data = props.data;
  }

  const handleChange = (event, { value, name }) => {
    const dataName = name.replace(/-\d+$/, '');
    const newContactInfo = {
      ...contactInfo,
      [dataName]: value,
    };

    setContactInfo(newContactInfo);

    if (isFunction(props.onChange)) {
      props.onChange(index, newContactInfo);
    }

    data[dataName] = value;
  }

  return (
    <Fragment>
      <Form.Select
        name={`info_type-${index}`}
        id='form-select-control-type'
        onChange={handleChange}
        fluid
        label='Info type'
        options={options}
        placeholder='Info type'
        value={data.info_type}
        required
      />
      <Form.Field
        name={`address-${index}`}
        id='form-input-control-address'
        onChange={handleChange}
        control={Input}
        label='Address'
        placeholder='Address'
        value={data.address}
        required
      />
      <Form.Group widths='equal'>
        <Form.Field
          name={`city-${index}`}
          id='form-input-control-city'
          onChange={handleChange}
          control={Input}
          label='City'
          placeholder='City'
          value={data.city}
          required
        />
        <Form.Field
          name={`state-${index}`}
          id='form-input-control-state'
          onChange={handleChange}
          control={Input}
          label='State'
          placeholder='State'
          value={data.state}
          required
        />
        <Form.Field
          name={`zip-${index}`}
          id='form-input-control-zip'
          onChange={handleChange}
          control={Input}
          label='Zip'
          placeholder='Zip'
          value={data.zip}
          required
        />
      </Form.Group>
     <Form.Field
        name={`country-${index}`}
        id='form-input-control-country'
        onChange={handleChange}
        control={Input}
        label='Country'
        placeholder='Country'
        value={data.country}
        required
      />
      <Form.Field
        name={`email-${index}`}
        id='form-input-control-email'
        onChange={handleChange}
        control={Input}
        label='Email'
        placeholder='Email'
        value={data.email}
        required
      />
      <Form.Field
        name={`phone-${index}`}
        id='form-input-control-phone'
        onChange={handleChange}
        control={Input}
        label='Phone'
        placeholder='Phone'
        value={data.phone}
        required
      />
    </Fragment>
  );
}
