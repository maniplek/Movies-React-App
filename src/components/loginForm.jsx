import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  //to find an error we can use //errors.find(e=>e.name === 'username) but this can be not clean instead let's use error object we defined in state

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required.";
    if (account.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors; // this will return array of all the keys in this object
  };

  handleSubmit = (e) => {
    e.preventDefault(); //here we are preventing submition of the form before next line

    const errors = this.validate();
    this.setState({ errors: errors || {} }); // this means error shhould always have an object that's why we added OR {}
    if (errors) return null;

    // call the server
    console.log("submited....");
  };

  validateProperty =  ({name, value}) => {
    if(name === 'username'){
        if(value.trim() === '') return 'Username is required.'
        // ... any other validation...
    }
    if(name === 'password'){
        if(value.trim() === '') return 'Password is required.'
    }
  }

  handleChange = ({ currentTarget: input }) => {
   
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input) //this is checking error on each input
    if(errorMessage) errors[input.name] = errorMessage //this is the eeror message we will get in validationProperty function 
    else delete errors[input.name] //if there is no error in input feild 

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

          <button className="button btn btn-primary mt-3">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
