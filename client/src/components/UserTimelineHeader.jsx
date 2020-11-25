import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row, Container } from "react-bootstrap";
import UserAvatar from "../assets/UserLogo.svg";

export default class UserTimelineHeader extends React.Component{
  render(){
    return (                    
      <Card.Header>
        <Card.Img
          className="mb-3 rounded mx-auto d-block"
          id="CpLogo"
          src={UserAvatar}
          alt="Card image cap"
        />
        <h1> {this.props.username} </h1>
      </Card.Header>
    )
}
}