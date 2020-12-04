/*Styles*/
import '../styles/App.css'
/*Services*/
import activePathwayService from '../services/activePathway';
/*Components*/
import React, { Component } from "react";
import ActivePathwayTaskTextSubmissionForm from "../components/forms/ActivePathwayTaskTextSubmissionForm"
import {withRouter} from 'react-router-dom';

class TaskStatusPage extends Component {
  state = {
    pathways: [],
    task: {},
  }
  async componentDidMount() {
    try {
      const activeTask = await activePathwayService.getActivePathwayTask(this.props.match.params.activeTaskId);
      this.setState({
        "task": activeTask.task
      })
    } catch (error) {
      console.log(error);
    } 
  }

  render() {
    return (
      <div>
        <h1 className="mt-3 mb-3">Task: {this.state.task.id}</h1>
        {this.state.pathways}
        <ActivePathwayTaskTextSubmissionForm task={this.state.task}/>
      </div>
    );
  }
}

export default withRouter(TaskStatusPage);