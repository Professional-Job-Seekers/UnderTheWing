import React from 'react';
import matchService from '../../services/match'
import {getCookie} from '../../services/cookies'
export default class MentorMatchResultPage extends React.Component {
  state = {
    success: false,
    successMsg: "",
    failureMsg:""    
  }
  async componentDidMount(){
    const mentorUsername = this.props.match.params.mentor;
    const matchOutcome = await matchService.matchUserWithMentor(mentorUsername, getCookie('username'));
    if(matchOutcome.status === 500){
      this.setState({
        failureMsg: "Unable to match with user. Please try again later.",        
      })
      return;
    } else {
      this.setState({
        success: true,
        successMsg: "Successfuly Matched with Mentor!.",        
      });
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