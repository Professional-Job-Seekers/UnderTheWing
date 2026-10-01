import React, { Component } from "react";
// import "../../Style/card-style.css"
import 'bootstrap/dist/css/bootstrap.min.css'
// import { ta } from 'react-bootstrap';
// import 'bootstrap/dist/js/bootstrap'



export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
     
    };
   
  

 
  }

 
  

  render() {
    return (
          <div className="mb-3">
            
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Home</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
  </li>
  <li className="nav-item" role="presentation">
    <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
</div>
          </div>

    );
  }
}
