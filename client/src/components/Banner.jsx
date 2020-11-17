/* UTW Banner / Graphic */
// import HomeSchedule from './views/NetworkingMeetups/homeSchedule';
// import { Button } from 'react-bootstrap';
import '../styles/banner.css';
import React from "react";
import Pics2 from "../assets/CompanyLogo.svg";

export default class Banner extends React.Component{
  render(){
    return (
      <div className="jumbotron-fluid mx-auto ">
        <div className="container1 img-fluid  "  alt="Responsive image">
          <div className="row mx-md-n5 ">
            <center>
              {/* <h1>Under the Wing</h1> */}
              <img src={Pics2} className="img-fluid w-25 p-3 " alt="CompanyLogo" />
              {/* <img id="CpLogo2" src={Pics2} className="" alt="CompanyLogo" /> */}
            </center>
            <div className="bird-container bird-container--one">
              <div className="bird bird--one"></div>
            </div>
            <div className="bird-container bird-container--two">
              <div className="bird bird--two"></div>
            </div>
            <div className="bird-container bird-container--three">
              <div className="bird bird--three"></div>
            </div>
            <div className="bird-container bird-container--four">
              <div className="bird bird--four"></div>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

