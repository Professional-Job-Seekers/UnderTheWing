import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import { FaTwitter } from "react-icons/fa";
// import {IconContext} from "react-icons";


import { Card, Container, Row, Col } from "react-bootstrap";
import "../styles/MentorCard.css";
import Stockperson1 from "../assets/Person1.jpeg";
import Stockperson3 from "../assets/person2.jpeg";
import Stockperson2 from "../assets/person3.jpeg";
import Stockperson4 from "../assets/person4.jpeg";

const MentorPageCard = () => {
  const cardinfo = [
    { person: Stockperson1, name: "Jenna Smith", mentortype: "Software Dev" },
    { person: Stockperson2, name: "John Doe", mentortype: "Research"   },
    { person: Stockperson3, name: "Susan Murphy", mentortype: "Engineering"  },
    { person: Stockperson4, name: "Milton Simons", mentortype: "Mathematician"  },
  ];

  const renderCard = (card, index) => {
    return (
      <Col className="col-lg-3 col-md-6">
      <Card className="mb-3 card-img-top overflow p-2 " key={index}>
        <Card.Header className="bg-dark">
          <Card.Img
            src={card.person}
            className="img-fluid rounded-circle w-50 mb-3 img-thumbnail mx-auto d-block"
          />
        </Card.Header>

        <Card.Body className="">
          <Card.Text>
            <p> dhahdvhavdh</p>
          </Card.Text>
        </Card.Body>
        <Card.Title>
          {" "}
          <h3> {card.name}</h3>
        </Card.Title>
        <Card.Subtitle>
          {" "}
          <h5> {card.mentortype}</h5>{" "}
        </Card.Subtitle>
        <Row className="d-flex flex-row justify-content-center">
          <div className="p-4">
            <a href="#">
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
          <div className="p-4">
            <a href="#">
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
          <div className="p-4">
            <a href="#">
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
        </Row>
      </Card>
      </Col>
    );
  };

  return (
    <Container className="my-3  text-center">
      <Row className="mb-3">
            <Col className="">
              <h1>Mentor Team</h1>
               {/* <FaTwitter /> */}

              {/* <FaLinkedin/> */}
              {/* <IconContext.Provider>
              <div>
                <FaTwitter />
              </div>
            </IconContext.Provider> */}
            </Col>
          </Row>
      <Row>
       {cardinfo.map(renderCard)}
      </Row>
    </Container>
  );
};

export default MentorPageCard;
