import Pics from "../assets/campaign-objective-icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";


const ObjectiveComp = () => {
  const cardinfo = [
    { title: "Objective" },
    { title: "Objective" },
    { title: "Objective" },
    { title: "Objective" },
  ];

  const renderCard = (card, index) => {
    return (
        <div className="col ">
          <Card className="mb-3 card-img-top overflow " key={index}>
            <Card.Body>
              {/* <Card.Text> Test </Card.Text> */}
              <Card.Img src={Pics} />
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
        </div>
    );
  };

  return (
    <div className="container-fluid d-flex justify-content-center bg-dark">
      {cardinfo.map(renderCard)}
    </div>
  );
};

export default ObjectiveComp;
