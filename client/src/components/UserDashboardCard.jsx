import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

export default class UserDashboardCard extends React.Component {
  render() {
    return (
      <Card.Body>
        <Card.Title> {this.props.cardTitleText}</Card.Title>
        <Card.Text>{this.props.cardBodyText}</Card.Text>
      </Card.Body>
    );
  }
}
