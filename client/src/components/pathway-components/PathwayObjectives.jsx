/*Styles*/
import "../../styles/MentorCard.css";
/*Components*/
import React from "react";
import PathwayDashboardTask from "./PathwayDashboardTask";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";

export default class PathwayObjectives extends React.Component {
  render() {
    console.log(this.props)
    const activePathwayComponents = this.props.activePathwayData.map(
      (pathway, index) => (
        <Tab className="text-warning mt-5" eventKey={pathway.pathway} title={pathway.pathway} key={index} >
          {pathway.tasks.map((task, index) => (
            <div >
              <PathwayDashboardTask
                key={index}
                taskTitle={task.title}
                taskStatus={task.status}
                baseURL={this.props.baseURL}
              />
            </div>
          ))}
        </Tab>
      )
    );
    return (
      <div>
        <Container className="cardbodycolor">
          <h2 className="text-light p-3">Your Active Pathways</h2>
          <Row>
            <Col>
              <Tabs className=" mynavback btn-outline-warning  nav-fill"> {activePathwayComponents} </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


