import React from 'react';

const inputType = ({ type, placeholder, checked ,disabled,value,classes ,name,onChange,passRef ,...rest}) => {
 //console.log(rest);
 if(rest.colDef.field==='action'){
  return (
   <>
    <input
      type={type}
      placeholder={placeholder}
      defaultChecked={checked}
      disabled={disabled}
      value={value}
      className={classes}
      name={name}
      onClick={(Event)=>{
        console.log(rest)
      rest.data[rest.colDef.field] = Event.target.value;
      rest.api.updateRowData({ update:[rest.data] });
      rest.onSaveClick(rest)
      }}
      ref={passRef}
    />
    <input
      type={type}
      placeholder={placeholder}
      defaultChecked={checked}
      disabled={disabled}
      value='revert'
      className={classes}
      name={name}
      onClick={(Event)=>{
        console.log(rest)
      rest.data[rest.colDef.field] = Event.target.value;
      rest.api.updateRowData({ update:[rest.data] });
      rest.onSaveClick(rest)
      }}
      ref={passRef}
    />
    </>

);
 }else{
  return (
   
      <input
        type={type}
        placeholder={placeholder}
        defaultChecked={checked}
        disabled={disabled}
        value={value}
        className={classes}
        name={name}
        onChange={(Event)=>{
          console.log(rest)
        rest.data[rest.colDef.field] = Event.target.value;
        rest.api.updateRowData({ update:[rest.data] });
        rest.onCellValueChanged(rest)
        }}
        ref={passRef}
      />

  );
      }
};

export default inputType;
