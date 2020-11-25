import React from "react";

export default class PathwayTask extends React.Component{    
  render(){
    return (
      <div className="card">
        <div className="card-body">
            <h5 className="card-title">{this.props.taskTitle}</h5>
            <p className="card-text">{this.props.taskDescription || "Task Description not available."}</p>
        </div>
      </div>
    );
  }
}

