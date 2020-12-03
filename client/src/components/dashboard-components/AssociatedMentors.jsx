/*Services*/
import matchService from "../../services/match"
/*Components*/
import React from "react";
import { Col, Row, Container } from "react-bootstrap";
export default class AssociatedMentors extends React.Component {
  state = {
    "mentors": []
  }
  async componentDidMount() {
    const mentors = await matchService.getAllMentorsForMentee(this.props.username);
    console.log(mentors);
    const mentorComponents = mentors.mentors.map((mentor, index) =>
      (<li key={index}>{mentor.first_name + " " + mentor.last_name}</li>)
    );
    this.setState({
      'mentors': mentorComponents
    })
  }
  render() {
    return (
      <section id="team">
        <Container>
          <h3>Your Mentors</h3>
          <Row className="d-flex flex-row ">
            <Col>
              <ul className="list-unstyle">
                {this.state.mentors}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
