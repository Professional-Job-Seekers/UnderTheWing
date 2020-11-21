import React, { Component } from "react";
import '../../styles/forms.css'
export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      registrationErrors: "",
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
    const { email, password, firstName, lastName, username, registrationErrors} = this.state;
    const signupRequestJSON = {
      "first_name": firstName,
      "last_name": lastName,
      "username": username,
      "email": email,
      "password": password
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(signupRequestJSON)
    };
    try {
      const response = await fetch('api/auth/signup/', requestOptions);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div class="custom-form-wrapper container justify-content-center">    
        <div class="row align-items-center">
            <div class="col-12">
                <h1> Sign Up</h1>
                <form className="custom-form" onSubmit = {this.handleSubmit}>
                    <div class="form-group">
                      <input  className="form-control" type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/>
                    </div>
                    <div class="form-group">
                      <input className="form-control" type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required />
                    </div>
                    <div class="form-group">
                      <input className="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}  required />
                    </div>
                    <div class="form-group">
                      <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div class="form-group">
                      <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    </div>
                    <div class="form-group">
                      <input className="form-control" type="password" name="passwordConfirmation" placeholder="Retype Password" value={this.state.password_Confirmation}
                        onChange={this.handleChange} required
                      />
                    </div>
                    <button className="btn btn-primary" type="submit"> Register </button>
                </form>
              </div>
          </div>
      </div>
    );
  }
}


