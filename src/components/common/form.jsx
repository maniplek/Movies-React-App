import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); //here we are preventing submition of the form before next line

    const errors = this.validate();
    this.setState({ errors: errors || {} }); // this means error shhould always have an object that's why we added OR {}
    if (errors) return null;
    
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input); //this is checking error on each input
    if (errorMessage) errors[input.name] = errorMessage;
    //this is the eeror message we will get in validationProperty function
    else delete errors[input.name]; //if there is no error in input feild

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };


}

export default Form;
