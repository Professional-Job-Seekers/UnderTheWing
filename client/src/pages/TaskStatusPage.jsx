/*Styles*/
import '../styles/App.css'
/*Services*/
import pathwayService from '../services/pathway';
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
// {this.props.match.params.activeTask}
  }

  render() {
    return (
      <div>
        <h1 className="mt-3 mb-3">Task: {this.state.task.title}</h1>
        {this.state.pathways}
        <ActivePathwayTaskTextSubmissionForm task={this.state.task}/>
      </div>
    );
  }
}

export default withRouter(TaskStatusPage);