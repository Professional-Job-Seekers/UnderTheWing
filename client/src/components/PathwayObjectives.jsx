import React from "react";
import "../styles/App.css";
import { Tabs, Tab, Button, Container, Row, Col } from "react-bootstrap";
import ObjectiveCards from "../Cards/ObjectiveCards";
import PathwayTask from "./PathwayTask";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Route from "react-router-dom/Route";
import TaskStatusPage from "../pages/TaskStatusPage";

export default class PathwayObjectives extends React.Component {
  render() {
    // const newpage = <Redirect to={{
    //   pathname: '/login',
    //   state: { from: props.location }
    // }} />;
    const activePathwayComponents = this.props.activePathwayData.map(
      (pathway, index) => (
        <Tab eventKey={pathway.pathway} title={pathway.pathway} key={index}>
          {pathway.tasks.map((task, index) => (
            <div>
              <PathwayTask
                key={index}
                taskTitle={task.title}
                taskStatus={task.status}
              />

             
            </div>
          ))}

          {/* <Link to="/taskstatus" > click </Link> */}

          {/* <Redirect to="/taskstatus" /> */}
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
