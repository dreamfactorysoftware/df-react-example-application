import React, {
  useCallback,
} from 'react';
import {
  Button,
  Segment,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';
import ContactInfoForm from '../common/ContactInfoForm';

export default function NewContactInfoForm({
  onRemoveInfoClick,
  data,
  index,
  onChange
}) {
  const handleRemoveInfoClick = useCallback((event) => {
    event.preventDefault();

    if (isFunction(onRemoveInfoClick)) {
      onRemoveInfoClick(event, index);
    }
  }, [onRemoveInfoClick, index]);

  return (
    <Segment>
      <Button
        name={`delete-${index}`}
        size='mini'
        floated='right'
        icon='delete'
        content='remove'
        onClick={handleRemoveInfoClick} />
      <ContactInfoForm data={data} index={index} onChange={onChange} />
    </Segment>
  );
}
