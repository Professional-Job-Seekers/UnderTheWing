import React, { Component } from "react";
import '../styles/App.css'
import { Card, Col, Row, Container } from "react-bootstrap";


export default class MentorPage extends Component {
  render() {
    return (

        <Container fluid >
        <Row className="d-flex flex-row ">
          <Col xs={6} className="d-flex flex-column">
            <Card bg="yellow" text="black" className="d-flex justify-content-center">              
            <p>fsifjio</p>
            </Card>
          </Col>
        </Row>
      </Container>
     
    );
  }
}


