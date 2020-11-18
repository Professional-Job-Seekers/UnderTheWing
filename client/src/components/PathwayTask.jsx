import React from "react";

export default class PathwayTask extends React.Component{    
  render(){
    return (
      <div class="card">
        <div class="card-body">
            <h5 class="card-title">{this.props.taskTitle}</h5>
            <p class="card-text">{this.props.taskDescription || "Task Description not available."}</p>
        </div>
      </div>
    );
  }
}

