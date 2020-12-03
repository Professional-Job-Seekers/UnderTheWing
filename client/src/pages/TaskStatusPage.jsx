/*Components*/
import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import TaskDetail from "../components/pathway-components/TaskDetail";
/*Services*/
import pathwayService from '../services/pathway';
/*Styles*/
import '../styles/App.css'

export default class TaskStatusPage extends Component {
  state = {
    pathways: [],
    taskStatus: ""// 
  }
  async componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1 className="mt-3 mb-3">{}</h1>
        {this.state.pathways}
      </div>
    );
  }
}




