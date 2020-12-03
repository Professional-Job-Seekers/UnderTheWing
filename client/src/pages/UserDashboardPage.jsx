import React, { Component } from "react";
/* Styles */
import "../styles/App.css";
import "../styles/MentorCard.css";
/* Services */
import { getCookie } from "../services/cookies"
import pathwayService from "../services/pathway";
/* Components */
import PathwayObjectives from "../components/pathway-components/PathwayObjectives";
import UserTimelineHeader from "../components/dashboard-components/UserTimelineHeader";
import UserDashboardCard from "../components/dashboard-components/UserDashboardCard";
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
      // <section id="team">

      <Container className="mt-2">
        <Row className="d-flex flex-row ">
          <Col className="d-flex flex-column">
            <Card bg="" text="black" className="d-flex justify-content-center ">              
              <UserTimelineHeader username = {this.state.username} />
              <UserDashboardCard cardTitleText = "About Me" cardBodyText = "Lorem ipsum" />
              <PathwayObjectives activePathwayData = {this.state.pathways} baseURL={this.props.match.url} />
            </Card>
          </Col>
        </Row>
      </Container>
      // </section >

    );
  }
}
