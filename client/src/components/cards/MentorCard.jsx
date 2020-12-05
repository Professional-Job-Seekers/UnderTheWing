/*Styles*/
import "bootstrap/dist/css/bootstrap.min.css";
/*Components*/
import React, { Component } from "react";
import {Card, Col} from "react-bootstrap";
import UserAvatar from "../../assets/UserLogo.svg";
import "../../styles/MentorCard.css"
export default class MentorCard extends Component {
  render() {
    return (
      <Col className="col-4 team">
      <Card className="mb-5 p-2" key={this.props.index}>
        <Card.Header className="bg-dark">
          <Card.Img className="img-fluid rounded-circle w-50 mb-3 img-thumbnail mx-auto d-block" id="CpLogo" src={UserAvatar} alt="Card image cap" />
        </Card.Header>
        <Card.Title className="pt-2 -pb-1"> <h3> {this.props.firstName + " " + this.props.lastName}</h3></Card.Title>
        <a href=
          {`${this.props.baseURL}/match/${this.props.mentorUsername}`}
          className="btn btn-dark btn"> <strong>Match</strong>
          </a>
      </Card>
        </Col>
    );
  };
}

