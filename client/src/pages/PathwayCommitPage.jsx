import React from 'react';
import '../styles/App.css'
import pathwayService from '../services/pathway'
export default class PathwayCommitPage extends React.Component {
  state = {
    success: false,
    successMsg: "",
    failureMsg:""    
  }
  async componentDidMount(){
    const pathwayTitle = this.props.match.params.pathway;
    const commitOutcome = await pathwayService.commitUserToPathway(pathwayTitle);
    if(commitOutcome.status === 500){
      this.setState({
        failureMsg: "Unable to process your request at this time. Please try again later.",        
      })
      return;
    }
    this.setState({
      failureMsg: "Successfuly added Pathway to Account!.",        
    })
  }
  render(){
    return (
      <div>
        <h1> { this.state.success ? "Success!" : "Failure!"} </h1>
        {this.state.successMsg || this.state.failureMsg}
      </div>
    );
  }
}