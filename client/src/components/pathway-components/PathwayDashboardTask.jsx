/*Styles*/
import "../../styles/App.css";
/*Services*/
import pathwayService from "../../services/pathway";
/*Components*/
import "../../styles/MentorCard.css";
import React from "react";
import ObjectiveLogo from "../../assets/campaign-objective-icon.svg";
import { Card, Button } from "react-bootstrap";

export default class PathwayDashboardTask extends React.Component {
  state = {
    pathway: "",
    tasks: [],
  }

  
  render() {
    return (
      <section id="team">
        <Card className="text-center mb-4 ">
          <Card.Header className="bg-dark">
            <Card.Subtitle className="text-warning">
              <h5>{this.props.taskTitle}</h5>
            </Card.Subtitle>
          </Card.Header>

          <Card.Body className="p-2">
            <Card.Subtitle className=" bg-dark p-3">
              <Card.Text >
                {this.props.taskDescription || "No Description Available"}
              </Card.Text>
    
            </Card.Subtitle>
          </Card.Body>

          <Card.Footer className="bg-dark">
            <Button
              className="mt-3 mynavback btn-outline-warning text-warning"
              exact
              href={`${this.props.baseURL}/pathways/progress/active-pathway-task/${this.props.taskId}/${this.props.taskTitle}`}
            >
              <strong>See more</strong> 
            </Button>
          </Card.Footer>
        </Card>
      </section>
    );
  }
}
