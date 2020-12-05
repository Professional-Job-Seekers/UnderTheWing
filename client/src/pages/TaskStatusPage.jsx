/*Styles*/
import '../styles/App.css'
/*Services*/
import activePathwayService from '../services/activePathway';
import pathwayService from '../services/pathway';
/*Components*/
import React, { Component } from "react";
import ActivePathwayTaskTextSubmissionForm from "../components/forms/ActivePathwayTaskTextSubmissionForm"
import {withRouter} from 'react-router-dom';

class TaskStatusPage extends Component {
  state = {
    pathways: [],
    task: {},
    active_task:{}
  }
  async componentDidMount() {
    try {
      const activeTask = await activePathwayService.getActivePathwayTask(this.props.match.params.activeTaskId);
      console.log(activeTask);
      this.setState({
        "task": activeTask.task,
        "active_task": activeTask.active_task
      });
    } catch (error) {
      console.log(error);
    } 
  }

  render() {
    console.log(this.state.active_task.status);
    return (
      <div>
        <h1 className="mt-3 mb-3">Task: {this.state.task.title}</h1>
        <p> <strong>Description: </strong> {this.state.task.description || "No Description available!"} </p>
        <p> <strong>Requires Mentor Review: </strong>{this.state.task.requires_review? " Yes" : " No"} </p>
      
        <p> <strong>Current Status: </strong>{ pathwayService.taskStatus[this.state.active_task.status]} </p>
        <ActivePathwayTaskTextSubmissionForm activeTaskId={this.state.active_task.id}/>
      </div>
    );
  }
}

export default withRouter(TaskStatusPage);