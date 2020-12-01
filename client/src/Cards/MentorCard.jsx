import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import UserAvatar from "../assets/UserLogo.svg";

export default class MentorCard extends Component {
  render() {
    return (
          <Col className="col-4">
            <Card className="mb-3 card-img-top  p-2 " key={this.props.index}>
              <Card.Header className="bg-dark">
                <Card.Img className="img-fluid rounded-circle w-50 mb-3 img-thumbnail mx-auto d-block" id="CpLogo" src={UserAvatar} alt="Card image cap" />
              </Card.Header>
              <Card.Body className="">
                {this.props.headline}
              </Card.Body>
              <Card.Title> <h3> {this.props.firstName + " " + this.props.lastName}</h3></Card.Title>
              <Card.Subtitle><h5> {this.props.mentorType}</h5>{" "}</Card.Subtitle>
              <a href={`${this.props.baseURL}/match/${this.props.mentorUsername}`} className="btn btn-primary">Match</a>
            </Card>
          </Col>
    );
  };
}

