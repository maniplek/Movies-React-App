import React from "react";

const Input = ({ name, label, value, onChange, error }) => {
  return (
    <div className="form-group  mt-3">
      {label}
      <label htmlFor={name}></label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type="text"
        className="form-control form-control-lg w-50 mt-2"
      />
      {/**this will occar/ will be displayed when there is an error*/}
      {error && <div className="alert alert-danger w-50">{error}</div>} 
    </div>
  );
};

export default Input;
