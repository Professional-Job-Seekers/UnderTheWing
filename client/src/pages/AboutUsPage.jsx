import React from "react";
import {Container, Row, Col } from "react-bootstrap";
import aboutStrings from "../text/aboutUs";
import "../styles/App.css";

export default  function AboutUsPage(props) {
  return (
    <Container className="mb-5">
      <Row className=" ml-5 mr-5">
        <Col className="about-section m-4 ml-5 mr-5 col-12">
          <h1 className="mytitle">About Us </h1>
          <p className="text-left">{aboutStrings.utwPitch}</p>
          <p className="text-left pt-2">{aboutStrings.utwDetail}</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-6">
          <h2>Joshua Carpentier</h2>
          <p className="font-italic">Co-Founder & Full Stack Developer</p>
          <p>
            <a href="https://github.com/jacgit18" target="_blank">
              github.com/jacgit18
            </a>
          </p>
        </Col>
        <Col className="col-6">
          <h2>Muneeb Khawaja</h2>
          <p className="font-italic">Co-Founder & Full Stack Developer</p>
          <p>
            <a href="https://github.com/mtkhawaja" target="_blank">
              github.com/mtkhawaja
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}