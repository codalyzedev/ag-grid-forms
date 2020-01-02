import React from 'react';

const inputType = ({ type, placeholder, checked ,disabled,value,classes ,name,onChange,passRef}) => {
  return (
   
      <input
        type={type}
        placeholder={placeholder}
        defaultChecked={checked}
        disabled={disabled}
        value={value}
        className={classes}
        name={name}
        onChange={onChange?(Event)=>onChange(Event):()=>{}}
        ref={passRef}
      />

  );
};

export default inputType;
