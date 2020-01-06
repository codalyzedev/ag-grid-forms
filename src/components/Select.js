import React from 'react';

const Select = ({ options ,classes,name}) => {
  return (
    <select className={classes} name={name}>
      {options.map(option => (
        <option key={option.id}>{option.name}</option>
      ))}
    </select>
  );
};

export default Select;
