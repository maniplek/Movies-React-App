import React, { Component } from "react";
import Input from "./common/input";
import Form from './common/form'
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  //to find an error we can use //errors.find(e=>e.name === 'username) but this can be not clean instead let's use error object we defined in state

  //Joi schema
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // call the server
    console.log("submited....");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />

          <Input
            name="password"
            value={data.password}
            label="password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button
            disabled={this.validate()} // as we know validate function will return null or an object with or more errors so if it returns null, null is false similar to pass false in fuction but if it return an object that men an error thats truethy here
            className="button btn btn-primary mt-3"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
