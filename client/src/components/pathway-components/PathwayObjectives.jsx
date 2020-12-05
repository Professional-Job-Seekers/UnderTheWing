/*Styles*/
import "../../styles/MentorCard.css";
/*Components*/
import React from "react";
import PathwayDashboardTask from "./PathwayDashboardTask";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";

export default class PathwayObjectives extends React.Component {
  state = {
    "activePathwayComponents": []
  }

  async componentDidMount() {
    if(this.props.activePathwayData === null){
      console.log(this.props.activePathwayData);
      this.setState({
        "activePathwayComponents": [],
      });
      return;
    }
    const activePathwayComponents = this.props.activePathwayData.map((pathway, index) => (
      <Tab className="text-warning mt-5" eventKey={pathway.pathway} title={pathway.pathway} key={index} >
        {pathway.tasks.map((task, index) => (
          <div >
            <PathwayDashboardTask
              key={index}
              taskTitle={task.title}
              taskId={task.id}
              baseURL={this.props.baseURL}
            />
          </div>
        ))}
      </Tab>
    ));
    this.setState({
      "activePathwayComponents": activePathwayComponents,
    });
  }

  render() {
    return (
      <div>
        <Container className="cardbodycolor">
          <h2 className="text-light p-3">Your Active Pathways</h2>
          <Row>
            <Col>
              <Tabs className=" mynavback btn-outline-warning  nav-fill"> {this.state.activePathwayComponents} </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


