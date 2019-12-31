import React from 'react';

const inputType = ({ type, placeholder, isChecked ,disabled,value,classes}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="form-control tne__input"
        checked={isChecked}
        disabled={disabled}
        value={value}
        className={classes}
      />
    </div>
  );
};

export default inputType;
