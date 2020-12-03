import React from "react";
import aboutStrings from "../text/aboutUs";
import { Card, Container, Row } from "react-bootstrap";

// Styles
import "../styles/App.css";
import "../styles/MentorCard.css";

function AboutUsPage(props) {
  return (
    <Container className="">
      <Row className=" ml-5 mr-5">

        <div className="about-section m-4 ml-5 mr-5 ">
          <h1 className="mytitle">About Us </h1>
          <h4>
          <p className="text-left">{aboutStrings.utwPitch}</p>
          <p className="text-left pt-3">{aboutStrings.utwDetail}</p>
          </h4>
        </div>
        {/* <section id="team"> */}

        <Card className="col-6 p-3">
          <h2>Joshua Carpentier</h2>
          <p className="font-italic">Co-Founder & Full Stack Developer</p>
          <p>
            <a href="https://github.com/jacgit18" target="_blank">
              {" "}
              github.com/jacgit18
            </a>
          </p>
        </Card>
       
       
        <Card className="col-6 p-3">
          {" "}
          <h2>Muneeb Khawaja</h2>
          <p className="font-italic">Co-Founder & Full Stack Developer</p>
          <p>
            <a href="https://github.com/mtkhawaja" target="_blank">
              {" "}
              github.com/mtkhawaja
            </a>
          </p>
        </Card>
        {/* </section > */}

        {/* </Card.Body> */}
      </Row>
    </Container>
  );
}

export default AboutUsPage;
