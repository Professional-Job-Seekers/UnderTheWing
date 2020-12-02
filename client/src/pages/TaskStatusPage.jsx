import React, { Component } from "react";
import '../styles/App.css'
import { Button, Container, Row, Col } from "react-bootstrap";
import pathwayService from '../services/pathway';
import TaskDetail from "../components/TaskDetail";


export default class TaskStatusPage extends Component {
    state = {
      pathways: [],
      taskStatus: ""// trying stuff
    }

    // pass in values in param
    /* Fetch Data Here */
    async componentDidMount() {
    const pathwayStatusData = await pathwayService.updatePathwayTaskProgress();
    // const pathwayData = await pathwayService.updatePathwayTaskProgress(1, "completed");

    //   const pathwayData = await pathwayService.getAllPathways();
      const pathwayComponents = pathwayStatusData.map(p =>
        <TaskDetail
          baseURL={this.props.match.url}
          pathwayTitle={p.title}
          pathwayDescription = {p.description}
        />);
      this.setState({ pathways: pathwayComponents })
    }
  
    render() {
      return (
        <div>
          <h1 className="mt-3 mb-3">Pathway Offering</h1>
          {this.state.pathways}
        </div>
      );
    }
  }
  
  
  

