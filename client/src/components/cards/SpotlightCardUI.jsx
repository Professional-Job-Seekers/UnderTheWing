/*Styles*/
import "bootstrap/dist/css/bootstrap.min.css";
/*Components*/
import React from 'react';
import { Card } from "react-bootstrap";
import ObjectiveLogo from "../assets/campaign-objective-done.svg";

const CardSpot = () => {
  const cardinfo = [
    { title: "Completed Objective" },
    { title: "Completed Objective" },
    { title: "Completed Objective" },
    { title: "Completed Objective" },
  ];

  const renderCard = (card, index) => {
    return (



      <Card className="mb-3 card-img-top overflow p-2 " key={index}>
        <Card.Body>
          {/* <Card.Text> Test </Card.Text> */}
          <Card.Img src={ObjectiveLogo} />
        </Card.Body>
        <Card.Title>{card.title} </Card.Title>
        <Card.Subtitle> {index + 1} </Card.Subtitle>
        <a
          href="http://localhost:4960/pathway"
          className="btn btn-outline-warning"
        >
          Take a Look
              </a>
        {/* btn btn-bd-download d-none d-lg-inline-block
               mb-3 mb-md-0 ml-md-3 */}


      </Card>
    );
  };

  return (
    <div className="container-fluid justify-content-center bg-dark">
      <h1 className="text-white"> Spotlight </h1>

      {cardinfo.map(renderCard)}
    </div>
  );
};

export default CardSpot;