import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  //to find an error we can use //errors.find(e=>e.name === 'username) but this can be not clean instead let's use error object we defined in state

  //Joi schema
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = {abortEarly: false}
    const {error} = Joi.validate(this.state.account, this.schema,options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) 
        errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault(); //here we are preventing submition of the form before next line

    const errors = this.validate();
    this.setState({ errors: errors || {} }); // this means error shhould always have an object that's why we added OR {}
    if (errors) return null;

    // call the server
    console.log("submited....");
  };

  validateProperty = ({ name, value }) => {
   const obj = { [name]: value};
   const schema = { [name]: this.schema[name] };
   const { error } = Joi.validate(obj, schema);
   return error ? error.details[0].message : null
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input); //this is checking error on each input
    if (errorMessage) errors[input.name] = errorMessage;
    //this is the eeror message we will get in validationProperty function
    else delete errors[input.name]; //if there is no error in input feild

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />

          <Input
            name="password"
            value={account.password}
            label="password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button 
          disabled={this.validate()} // as we know validate function will return null or an object with or more errors so if it returns null, null is false similar to pass false in fuction but if it return an object that men an error thats truethy here
          className="button btn btn-primary mt-3">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
