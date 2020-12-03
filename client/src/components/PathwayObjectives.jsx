import React from "react";
import { Tabs, Tab, Button, Container, Row, Col } from "react-bootstrap";
import ObjectiveCards from "../Cards/ObjectiveCards";
import PathwayTask from "./PathwayTask";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Route from "react-router-dom/Route";
import TaskStatusPage from "../pages/TaskStatusPage";

// Styles
import "../styles/App.css";
import "../styles/MentorCard.css";
import { Card } from "react-bootstrap";
import ObjectiveLogo from "../assets/campaign-objective-icon.svg";

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
            <section id="team">
             <div>
              <PathwayTask
                key={index}
                taskTitle={task.title}
                taskStatus={task.status}
                baseURL={this.props.baseURL}
              />

             
            </div>
            </section >

          ))}

          {/* <Link to="/taskstatus" > click </Link> */}

          {/* <Redirect to="/taskstatus" /> */}
        </Tab>

      )
    );
    return (
      <Container className="cardbodycolor">
        <Row>
          <Col>
            <Tabs fill>{activePathwayComponents}</Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}


