import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  //...rest operator helps us to add any other type we want instead of exctracting
  return (
    <div className="form-group  mt-3">
      {label}
      <label htmlFor={name}></label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control form-control-sm w-50 mt-2"
      />
      {/**this will occar/ will be displayed when there is an error*/}
      {error && <div className="alert alert-danger w-50">{error}</div>}
    </div>
  );
};

export default Input;
