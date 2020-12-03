import React from "react";
import { Card } from "react-bootstrap";

export default class UserDashboardCard extends React.Component {
  render() {
    return (
      <Card.Body className="bg-dark ">
        <Card.Title> {this.props.cardTitleText}</Card.Title>
        <Card.Text>{this.props.cardBodyText}</Card.Text>
      </Card.Body>
    );
  }
}
