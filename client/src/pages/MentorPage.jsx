import React, { Component } from "react";
import MentorPageCard from "../Cards/MentorPageCard";
import MentorCard from "../Cards/MentorCard";
import accountService from "../services/account"
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import "../styles/MentorCard.css";

export default class MentorPage extends Component {
  state = {
    "mentors": []
  }
  async componentDidMount() {
    const mentors = await accountService.getAllMentors();
    const mentorComponents = mentors.map((mentor, index) =>
      <MentorCard
        baseURL={this.props.match.url}
        mentorUsername={mentor.Account.username}
        firstName={mentor.Account.first_name}
        lastName={mentor.Account.last_name}
      />);
    this.setState({
      'mentors': mentorComponents
    })
  }

  render() {
    return (
      <section id="team">
        <Container className="mt-5">
          <Row className="d-flex flex-row ">
          <Col className="">
          {this.state.mentors}

          </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
