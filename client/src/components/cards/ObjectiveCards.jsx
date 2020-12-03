/*Styles*/
import "bootstrap/dist/css/bootstrap.min.css";
/*Components*/
import { Card, Button, Col } from "react-bootstrap";
import ObjectiveLogo from "../../assets/campaign-objective-icon.svg";

const ObjectiveComp = () => {
  const cardinfo = [
    { title: "Objective" },
    { title: "Objective" },
    { title: "Objective" },
    { title: "Objective" },
  ];

  const renderCard = (card, index) => {
    return (
      <Col>
        <Card className="mb-3 card-img-top overflow " key={index}>
          <Card.Body>
            {/* <Card.Text> Test </Card.Text> */}
            <Card.Img src={ObjectiveLogo} />
          </Card.Body>
          <Card.Title>{card.title} </Card.Title>
          <Card.Subtitle> {index + 1} </Card.Subtitle>
          <Button href="http://localhost:4960/pathway">Take a Look</Button>

          {/* btn btn-bd-download d-none d-lg-inline-block
             mb-3 mb-md-0 ml-md-3 */}
        </Card>
      </Col>
    );
  };

  return (
    <div className="container-fluid d-flex justify-content-center bg-dark">
      {cardinfo.map(renderCard)}
    </div>
  );
};

export default ObjectiveComp;
