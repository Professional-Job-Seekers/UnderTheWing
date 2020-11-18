import React from "react";

export default class Pathway extends React.Component{    
  render(){
    return (
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">{this.props.pathwayTitle}</h5>
          <p class="card-text">{this.props.pathwayDescription || "No Description Available"}</p>
        </div>
        <div class="card-footer">
          <a href={`${this.props.baseURL}/pathway-detail/${this.props.pathwayTitle}`} class="btn btn-primary">Learn More</a>
        </div>
      </div>
    );
  }
}

