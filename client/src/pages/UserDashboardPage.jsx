import "../styles/App.css";
import PathwayObjectives from "../components/PathwayObjectives";
// Services
import { getCookie } from "../services/cookies"
import pathwayService from "../services/pathway";
// Components
import React, { Component } from "react";
import UserTimelineHeader from "../components/UserTimelineHeader";
import UserDashboardCard from "../components/UserDashboardCard";

import { Card, Col, Row, Container, Button } from "react-bootstrap";

export default class Dash extends Component {
  state = {
    username: "",
    pathways: [],
  };

  /* Fetch Data Here */
  async componentDidMount() {
    let username = "";
    try{
      username = getCookie("username");
    } catch(err){
      console.log(err);
    }
    const activeUserPathways = await pathwayService.getAllActiveUserPathways();
    this.setState({
      pathways: activeUserPathways,     
      "username": username,  
    });
  }

    
  render() {
    return (
      <Container className="mt-2">
        <Row className="d-flex flex-row ">
          <Col className="d-flex flex-column">
            <Card bg="" text="black" className="d-flex justify-content-center">              
              <UserTimelineHeader username = {this.state.username} />
              <UserDashboardCard cardTitleText = "About Me" cardBodyText = "Lorem ipsum" />
              <PathwayObjectives activePathwayData = {this.state.pathways}/>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
