import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom';
import auth from '../../services/auth'
import {getCookie,setCookie} from '../../services/cookies'
import '../../styles/login.css';

class LoginForm extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    failed: false,
    redirectToReferrer: false,
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  handleSubmit = async (event) => {
    event.preventDefault();
    const {username, password} = this.state;
    try {
      const authResponse = await auth.authenticate(username, password);
      if(authResponse){
        this.setState({ redirectToReferrer: true });
        setCookie("auth", true);
        setCookie("username", username);
        const isMentor = await fetch(`api/accounts/mentor/?username=${username}`);
        const userType = isMentor.is_mentor ? "mentor" : "mentee";
        console.log(userType);
        setCookie("user_type", userType);
      }
    } catch (err) {
      console.log(err);
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
      <div>
        <h1>Login</h1>
        { err }
        <form  id="accesspanel" onSubmit={this.handleSubmit}>
          <div className="">
            <input
              className="form-control text-center"
              type="text"
              name="username"
              placeholder="Username or Email"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
            <br/>           
            <input
              className="form-control text-center"
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
export default withRouter(LoginForm);