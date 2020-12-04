/*Styles*/
import "../../styles/App.css";
import "../../styles/MentorCard.css";
/*Services*/
import pathwayService from "../../services/pathway";
/*Components*/
import React from "react";
import { Card, Col } from "react-bootstrap";
export default class PathwayTask extends React.Component {
  render() {
    return (
      <Col className="col-12 team">
        <Card className="text-center mb-4 ">
          <Card.Header className="bg-dark">
            {" "}
            <Card.Subtitle className="text-light">
              <h5>{this.props.taskTitle}</h5>
            </Card.Subtitle>
          </Card.Header>

          <Card.Body className="">

              <Card.Text className="text-dark">
                {this.props.pathwayDescription || "No Description Available"}
              </Card.Text>
            {this.props.taskStatus ? (
              <p>
                {" "}
                <strong>Status:</strong>{" "}
                {pathwayService.taskStatus[this.props.taskStatus]}{" "}
              </p>
            ) : null}

          </Card.Body>

        </Card>
      </Col>
    );
  }
}
