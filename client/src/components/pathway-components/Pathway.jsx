import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import "../../styles/App.css";
import "../../styles/MentorCard.css";


export default class Pathway extends React.Component {
  render() {
    return (
      <Col className="col-12 team">
        <Card className="text-center mb-4">
          <Card.Header className="bg-dark">
            <Card.Subtitle className="text-light">
              <h5>{this.props.pathwayTitle}</h5>
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle>
              <Card.Text  className="text-dark">
                {this.props.pathwayDescription || "No Description Available"}
              </Card.Text>
            </Card.Subtitle>
          </Card.Body>
          <Card.Footer className="bg-dark">
            <Button
              className="mt-3 mynavback btn-outline-warning text-warning"
              exact
              href={`${this.props.baseURL}/pathway-detail/${this.props.pathwayTitle}`}
            >
              <strong> See more </strong>
            </Button>
          </Card.Footer>
        </Card>
      </Col>


    );
  }
}

