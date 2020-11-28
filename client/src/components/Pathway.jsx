import React from "react";

export default class Pathway extends React.Component{    
  render(){
    return (
      <div className="card text-center mb-4">
        <div className="card-body">
          <h5 className="card-title">{this.props.pathwayTitle}</h5>
          <p className="card-text">{this.props.pathwayDescription || "No Description Available"}</p>
        </div>
        <div className="card-footer">
          <a href={`${this.props.baseURL}/pathway-detail/${this.props.pathwayTitle}`} className="btn btn-primary">Learn More</a>
        </div>
      </div>
    );
  }
}

