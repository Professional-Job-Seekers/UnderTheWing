import React from "react";
import "../styles/App.css";
import { Tabs, Tab, Button, Container, Row, Col } from "react-bootstrap";
import ObjectiveCards from "../Cards/ObjectiveCards";
import PathwayTask from "./PathwayTask";
export default class PathwayObjectives extends React.Component {
  render() {
    const activePathwayComponents = this.props.activePathwayData.map(
      (pathway, index) => (
        <Tab eventKey={pathway.pathway} title={pathway.pathway} key={index}>
          {pathway.tasks.map((task, index) => (
            <PathwayTask
              key={index}
              taskTitle={task.title}
              taskStatus={task.status}
            />
          ))}
          <Button
            className="mt-3"
            href={`${this.props.baseURL}/progress/update/${this.props.pathwayTitle}`}
          >
            Learn More
          </Button>
        </Tab>
      )
    );
    return (
      <Container>
        <Row>
          <Col>
            <Tabs fill>{activePathwayComponents}</Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}

// add to buttons submit to take you to a new pg with text box
// with infor below like task name and status

// new status contains taskStatus properties
/*
"completed": "Completed",
    "skipped": "Skipped",
    "under_review": 'Under Review', 
    "pending_start" : 'Pending Start', 
    "pending_review": 'Pending Review', 
    "in_progress": 'In Progress',

*/
//use to make a request to this endpoint
//POST : pathways/progress/update
// which is already setup in updatePathwayTaskProgress method

//  pathway.updatePathwayTaskProgress(pathway.taskStatus.completed)

// then make a card that shows stats on current pg
// edit Pathway.jsx file
