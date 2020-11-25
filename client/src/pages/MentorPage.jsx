import React, { Component } from "react";
import '../styles/App.css'
import { Card, Col, Row, Container, Accordion,  Button } from "react-bootstrap";


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
          <Col xs={6} className="d-flex flex-column">
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>

        
      </Container>
     
    );
  }
}


