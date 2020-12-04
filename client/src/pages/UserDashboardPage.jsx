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
import AssociatedMentors from "../components/dashboard-components/AssociatedMentors";
import UserDashboardCard from "../components/dashboard-components/UserDashboardCard";
import {Card, Col, Row, Container} from "react-bootstrap";

export default class Dash extends Component {
  state = {
    username: "",
    pathways: [],
  };
  /* Fetch Data Here */
  async componentDidMount() {
    let username = "";
    try {
      username = getCookie("username");
    } catch (err) {
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
        <Row className="">
          <Col className="col-9">
            <Card bg="" text="black" className="d-flex justify-content-center ">
              <UserTimelineHeader username={this.state.username} />
              <PathwayObjectives activePathwayData={this.state.pathways} baseURL={this.props.match.url} />
            </Card>
          </Col>
          <Col className="col-3">
            <AssociatedMentors username={this.state.username} />
          </Col>
        </Row>
      </Container>
    );
  }
}
