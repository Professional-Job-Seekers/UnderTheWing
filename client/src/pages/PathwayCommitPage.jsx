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
    } else if (commitOutcome.status === 409){
      this.setState({
        failureMsg: "You are already committed to this pathway. You can't commit to a pathway multiple times!.",        
      })
    } else {
      this.setState({
        success: true,
        successMsg: "Successfuly added Pathway to Account!.",        
      })
    }
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