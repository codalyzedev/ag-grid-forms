import React from 'react';

const Select = ({ options ,classes}) => {
  return (
    <select className={classes}>
      {options.map(option => (
        <option key={option.id}>{option.name}</option>
      ))}
    </select>
  );
};

export default Select;
