import React from "react";
import { Tabs, Tab, Button, Container, Row, Col } from "react-bootstrap";
import ObjectiveCards from "../../cards/ObjectiveCards";
import PathwayTask from "./PathwayTask";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Route from "react-router-dom/Route";
import TaskStatusPage from "../../pages/TaskStatusPage";

// Styles
import "../../styles/MentorCard.css";

export default class PathwayObjectives extends React.Component {
  render() {

    const activePathwayComponents = this.props.activePathwayData.map(
      (pathway, index) => (

        <Tab className="text-warning" eventKey={pathway.pathway} title={pathway.pathway} key={index} >
          {pathway.tasks.map((task, index) => (
            <section id="team" >

             <div >
             
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
            <Tabs className=" mynavback btn-outline-warning  nav-fill  "  >{activePathwayComponents}</Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}


