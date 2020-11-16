import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import '../../Style/login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
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

  handleSubmit(event) {
    // proably will use post
    // eslint-disable-next-lineS
    const { email, password, loginErrors } = this.state;

    // SomethingLikeAnAPI.post("http://localhost:3000/login", {
    //  user: {
    //   email: email,
    //   password: password,
    //   password_Confirmation: password_Confirmation
    //  }
    // },
    // {withCredentials: true}

    // ).then(response=>{
    //   console.log(`registration `)
    //   .catch(error => {
    //     console.log(`Registration error ${error}`)

    //   });
    // })

    event.preventDefault();
  }

  render() {
    return (
      <div >

        <form  id="accesspanel" onSubmit={this.handleSubmit}>
          
          <div className="">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
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
