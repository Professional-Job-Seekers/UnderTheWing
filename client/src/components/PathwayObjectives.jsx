import React from "react";
import "../styles/App.css";
import Tabs from "../components/Tabs";
import Card from "../Cards/ObjectiveCards";

export default class PathwayObjectives extends React.Component{    
  render(){
    return (
      <div className="col-fluid  ">
            <h2>Pathway </h2>
          <Tabs>
            <div label="Scientific Researcher" className="">
              <Card></Card>
            </div>
            <div label="Software Development" className="">
              <Card></Card>
            </div>
            <div label="Engineer" className="">
              <Card></Card>
            </div>
            <div label="Mathematician" className="">
              <Card></Card>
            </div>
          </Tabs>
      </div>

    
    );
  }
}

