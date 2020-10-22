import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      email_Confirmation: "",
      password: "",
      password_Confirmation: "",
      passwordHash: "",
      passwordSalt: "", 
      UserType: "",
      company: "",
      address: "",
      registrationErrors: "",

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event){
    console.log(`handle change ${event}`);
    
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  handleSubmit(event){
    // proably will use post
    // eslint-disable-next-line
    const {
      firstName ,
      lastName ,
      userName ,
      email ,
      email_Confirmation,
      password ,
      password_Confirmation ,
      passwordHash ,
      passwordSalt , 
      UserType , // add functionality to add more fields based on type
      company ,
      address ,
      registrationErrors ,

    } = this.state;
    
    console.log(`form submit`);
    event.preventDefault();
  }

  render() {
    return(
    <div className="form-group">
      <form className="" onSubmit={this.handleSubmit}>
      <div className="">
      <input className="" 
        type="firstName" 
        name="firstName" 
        placeholder="Firstname"  
        value={this.state.firstName} 
        onChange={this.handleChange}
        required
      />
      <input className=""
        type="lastName" 
        name="lastName" 
        placeholder="Lastname"  
        value={this.state.firstName} 
        onChange={this.handleChange}
        required
      />
       <input className=""
        type="userName" 
        name="userName" 
        placeholder="Username"  
        value={this.state.userName} 
        onChange={this.handleChange}
        required
      />
      <form >
      <label for="UserType">Choose a User Type:</label>
      <select name="UserType" id="UserType">
        <option value="Mentee">Mentee</option>
        <option value="Mentor">Mentor</option>
      </select>
      </form >

      
      <input className=""
       type="email" 
        name="email" 
        placeholder="Email"  
        value={this.state.email} 
        onChange={this.handleChange}
        required
      />
      <input className=""
       type="email" 
        name="email_Confirmation" 
        placeholder="Email_Confirmation"  
        value={this.state.email_Confirmation} 
        onChange={this.handleChange}
        required
      />
      <input className=""
        type="password" 
        name="password" 
        placeholder="Password"  
        value={this.state.password} 
        onChange={this.handleChange}
        required
      />
      <input className=""
        type="password" 
        name="password_Confirmation" 
        placeholder="Password_Confirmation"  
        value={this.state.password_Confirmation} 
        onChange={this.handleChange}
        required
      />

      </div>

      <div className="">

      <button className="" type="submit"> Register </button>
      </div>

      </form>
    </div>
    );
  }
}
