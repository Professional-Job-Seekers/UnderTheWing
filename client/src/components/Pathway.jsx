import React from "react";
import { Card, Button, Container } from "react-bootstrap";

// Styles
import "../styles/App.css";
import "../styles/MentorCard.css";
export default class Pathway extends React.Component {
  render() {
    return (
      <section id="team">

      <Card className="text-center mb-4">
      <Card.Header className="bg-dark">
      <Card.Title className="text-warning">{this.props.pathwayTitle}</Card.Title>
      </Card.Header>

        <Card.Body>

          <Card.Text>
            {this.props.pathwayDescription || "No Description Available"}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            className="mt-3"
            href={`${this.props.baseURL}/pathway-detail/${this.props.pathwayTitle}`}
          >
            Learn More
          </Button>
        </Card.Footer>
      </Card>
            </section >

     
    );
  }
}

