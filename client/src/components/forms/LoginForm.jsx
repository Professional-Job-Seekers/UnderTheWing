import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../../Style/login.css';
import auth from '../../services/auth'
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      failed: false,
      redirectToReferrer: false,
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
    const {username, password} = this.state;
    try {
      const authStatus = await auth.authenticate(username, password);
      this.setState({ redirectToReferrer: true });
    } catch (err) {
      this.setState({ failed: true });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, failed } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    let err = "";
    if (failed) {
      err = <div className="alert alert-danger" role="alert">Login Failed</div>;
    }

    return (
      <div >
        <form  id="accesspanel" onSubmit={this.handleSubmit}>
          <div className="">
            { err }
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
          </div>
        </form>
      </div>
    );
  }
}
