import React, { Component } from "react";
import Card from "./CardUI";
import Pics from "../assets/campaign-objective-icon.svg";

let ObjectiveNum = 0;


export default class Cards extends Component {
    
  render() {
      
    return (
        
      <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          {/* create for loop and also iterate objective */}
          <div className="col-sm-3">
            <Card imgSrc={Pics} title="Objective" />
          </div>
          <div className="col-sm-3">
          <Card imgSrc={Pics} title="Objective" />
          </div>
          <div className="col-sm-3">
          <Card imgSrc={Pics} title="Objective" />
          </div>
          <div className="col-sm-3">
          <Card imgSrc={Pics} title="Objective" />
          </div>
        </div>
        
      </div>
    );
  }
}
