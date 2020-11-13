import React, { Component } from "react";
import { Button } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginErrors: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(`handle change ${event}`);

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

async handleSubmit(event) {
    event.preventDefault();
    const { username, password, loginErrors } = this.state;
    const loginRequestJSON = {
      "username": username,
      "password": password
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(loginRequestJSON)
    };
    try {
      const response = await fetch('api/auth/login/', requestOptions);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="">
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Username or Email"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
            <br/>           
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <br/> 
  
          <div className="">
            <button className="btn btn-primary" type="submit">
              {" "}
              Login{" "}
            </button>
            <br/>             <br/>

            <button
              className="btn btn-primary"
              href="http://localhost:3000/register"
              type="button"
            >
              {" "}
              Register{" "}
            </button>
          </div>

          <a className="" href="http://localhost:3000/register">
            {" "}
            Register
          </a>
        </form>
      </div>
    );
  }
}
