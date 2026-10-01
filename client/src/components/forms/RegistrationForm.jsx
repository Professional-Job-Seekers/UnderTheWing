import { appHref } from '../../config/deployment';
import { apiFetch } from '../../services/api';
import React, { Component } from "react";
import '../../styles/forms.css'
import authService from "../../services/auth"
import {setCookie} from '../../services/cookies'

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      submitting: false,
      registrationErrors: "",
      userType: "mentee"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });

  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password, passwordConfirmation, firstName, lastName, username, userType} = this.state;
    if (this.state.submitting) return;
    if (password !== passwordConfirmation) {
      this.setState({ registrationErrors: 'Passwords do not match' });
      return;
    }
    this.setState({ registrationErrors: '', submitting: true });
    const signupRequestJSON = {
      "first_name": firstName,
      "last_name": lastName,
      "username": username,
      "email": email,
      "password": password,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(signupRequestJSON)
    };
    try {
      const creationResponse = await apiFetch('/api/auth/signup/', requestOptions);
      if (!creationResponse.ok) throw new Error('Registration failed. Check your details or try another username/email.');
      const configResponse = await apiFetch(`/api/accounts/${userType}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      if (!configResponse.ok) throw new Error('Account created, but profile setup failed. Please try signing in.');
      await authService.authenticate(username, password);
      setCookie("auth", true);
      setCookie("username", username);
      setCookie("user_type", userType);
      window.location.replace(appHref("/"));
    } catch (err) {
      authService.isAuthenticated = false;
      this.setState({ registrationErrors: err.message || 'Registration failed. Please try again.' });
    } finally {
      this.setState({ submitting: false });
    }
  }

  render() {
    return (
      <div className="custom-form-wrapper container justify-content-center">
        <div className="row align-items-center">
            <div className="col-12">
                <h1> Sign Up</h1>
                {this.state.registrationErrors && <div className="alert alert-danger" role="alert">{this.state.registrationErrors}</div>}
                <form className="custom-form" onSubmit = {this.handleSubmit}>
                    <div className="mb-3">
                      <input  className="form-control" type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/>
                    </div>
                    <div className="mb-3">
                      <input className="form-control" type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input className="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}  required />
                    </div>
                    <div className="mb-3">
                      <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    </div>
                    <div className="mb-3">
                      <input className="form-control" type="password" name="passwordConfirmation" placeholder="Retype Password" value={this.state.passwordConfirmation}
                        onChange={this.handleChange} required
                      />
                    </div>
                    <div className="mb-3">
                      <fieldset>
                        <legend> Join As:</legend>
                        <p>
                          <select required name ="userType" onChange={this.handleChange}>
                            <option value = "mentee"> Mentee</option>
                            <option value = "mentor"> Mentor</option>
                          </select>
                        </p>
                      </fieldset>
                    </div>
                    <button className="btn btn-dark btn-outline-warning" type="submit" disabled={this.state.submitting}> <strong> Register </strong> </button>
                </form>
              </div>
          </div>
      </div>
    );
  }
}


