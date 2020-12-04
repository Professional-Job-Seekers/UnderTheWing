/*Styles*/
import '../styles/App.css'
import "../styles/MentorCard.css";
import "../styles/card-style.css"
/*Services*/
import pathwayService from '../services/pathway';
/*Components*/
import React from 'react';
import PathwayTask from '../components/pathway-components/PathwayTask';
import { Card, Button, Container, Row, Col } from "react-bootstrap";

export default class PathwayDetailPage extends React.Component {
  state = {
    pathway: "",
    tasks: []
  }
  /* Fetch Data Here */
  async componentDidMount() {
    const pathwayTitle = this.props.match.params.pathway;
    const pathwayData = await pathwayService.getPathway(pathwayTitle);
    const tasks = pathwayData.pathway.tasks.map(task => <PathwayTask taskDescription={task.description} taskTitle={task.title} />);
    this.setState({
      pathway: pathwayTitle,
      tasks: tasks,
    });
  }
  render() {
    return (
      <Container className="container-fluid">
        <Row>
          <Col className="col-12">
            <h1 className="text-dark text-center text-warning">{this.state.pathway}</h1>
          </Col>
          {this.state.tasks}
          <Col className="col-12">
            <Button href={`/pathway/commit/${this.state.pathway}`} className="mt-3 mb-5 btn-dark btn-outline-warning"> <strong>Commit to Pathway</strong></Button>
          </Col>
        </Row>
      </Container>

    );
  }
}