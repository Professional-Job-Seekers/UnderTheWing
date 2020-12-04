import React, { Component } from "react";
import '../styles/App.css'
import pathwayService from '../services/pathway';
import Pathway from "../components/pathway-components/Pathway";
import { Container, Row, Col } from "react-bootstrap";

export default class PathwayPage extends Component {
  state = {
    pathways: []
  }
  /* Fetch Data Here */
  async componentDidMount() {
    const pathwayData = await pathwayService.getAllPathways();
    const pathwayComponents = pathwayData.map(p =>
      <Pathway
        baseURL={this.props.match.url}
        pathwayTitle={p.title}
        pathwayDescription={p.description}
      />);
    this.setState({ pathways: pathwayComponents })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="col-12 text-center">
            <h1 className="mt-3 mb-3 mytitle">Pathway Offering</h1>
          </Col>
          {this.state.pathways}
        </Row>
      </Container>
    );
  }
}


