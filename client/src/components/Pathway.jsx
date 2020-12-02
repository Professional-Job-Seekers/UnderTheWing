import React from "react";
import { Card, Button, Container } from "react-bootstrap";

export default class Pathway extends React.Component {
  render() {
    return (
      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title>{this.props.pathwayTitle}</Card.Title>

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

     
    );
  }
}

