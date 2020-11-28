import React from "react";
import pathwayService from "../services/pathway"
export default class PathwayTask extends React.Component{    
  render(){
    return (
      <div className="card">
        <div className="card-body">
            <h5 className="card-title">{this.props.taskTitle}</h5>
            <p className="card-text">{this.props.taskDescription || "Task Description not available."}</p>
            { (this.props.taskStatus) ? (<p> <strong>Status:</strong> {pathwayService.taskStatus[this.props.taskStatus]} </p>) : (null)}
        </div>
      </div>
    );
  }
}

