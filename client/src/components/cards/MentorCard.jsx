/*Styles*/
import "bootstrap/dist/css/bootstrap.min.css";
/*Components*/
import React, { Component } from "react";
import {Card, Col} from "react-bootstrap";
import UserAvatar from "../../assets/UserLogo.svg";

export default class MentorCard extends Component {
  render() {
    return (
      <Card className="mb-5 card-img-top  p-2 col-4" key={this.props.index}>
        <Card.Header className="bg-dark">
          <Card.Img className="img-fluid rounded-circle w-50 mb-3 img-thumbnail mx-auto d-block" id="CpLogo" src={UserAvatar} alt="Card image cap" />
        </Card.Header>
        <Card.Body className="">
          <Card.Text>
            {this.props.headline}
          </Card.Text>
        </Card.Body>
        <Card.Title> <h3> {this.props.firstName + " " + this.props.lastName}</h3></Card.Title>
        <Card.Subtitle><h5> {this.props.mentorType}</h5>{" "}</Card.Subtitle>
        <a href=
          {`${this.props.baseURL}/match/${this.props.mentorUsername}`}
          className="btn btn-dark ">Match
          </a>
      </Card>
    );
  };
}

