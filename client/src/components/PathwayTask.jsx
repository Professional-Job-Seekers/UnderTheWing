import React from "react";
import pathwayService from "../services/pathway";
import { Card, Button } from "react-bootstrap";
import "../styles/MentorCard.css";

export default class PathwayTask extends React.Component {
  state = {
    pathway: "",
    tasks : [],

   }
  
  
  
  render() {
    return (
      <section id="team">

      <Card className="text-center mb-4">
        <Card.Header className="bg-dark">
          {" "}
          <Card.Title className=" text-warning">
            <h5>{this.props.taskTitle}</h5>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text >
            {this.props.taskDescription || "Task Description not available."}
          </Card.Text>

          {this.props.taskStatus ? (
            <p>
              {" "}
              <strong>Status:</strong>{" "}
              {pathwayService.taskStatus[this.props.taskStatus]}{" "}
            </p>
          ) : null}
          <Card.Footer>
            <Button
              className="mt-3"
              exact
              href={`${this.props.baseURL}/pathways/progress/update/${this.props.pathwayTitle}`}
            >
              See more
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
      </section>

    );
  }
}
