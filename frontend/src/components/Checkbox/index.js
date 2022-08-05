import React from 'react';

const Checkbox = (...props) => (
  <Checkbox
    id={props.id}
    checked={props.checked}
    onChange={props.handleChange}
    inputProps={{ 'aria-label': 'primary checkbox' }}
    {...props}
  />
);
export default Checkbox;
