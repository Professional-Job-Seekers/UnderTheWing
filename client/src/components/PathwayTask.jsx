import React from "react";
import pathwayService from "../services/pathway";
import { Card, Button } from "react-bootstrap";
import "../styles/MentorCard.css";
import "../styles/App.css";

import ObjectiveLogo from "../assets/campaign-objective-icon.svg";

export default class PathwayTask extends React.Component {
  state = {
    pathway: "",
    tasks : [],

   }
  
  
  
  render() {
    return (
      <section id="team">

      <Card className="text-center mb-4 ">

           
        <Card.Header className="bg-dark">
          {" "}
          <Card.Subtitle className=" text-warning">
            <h5>{this.props.taskTitle}</h5>
          </Card.Subtitle>
          </Card.Header>



        <Card.Body className="">
        <Card.Img src={ObjectiveLogo} className="card-img-top overflow  complogo "  />
        <Card.Subtitle className=" bg-dark ">

          <Card.Text >
            {this.props.pathwayDescription || "No Description Available"}
          </Card.Text>
          </Card.Subtitle>


          {this.props.taskStatus ? (
            <p>
              {" "}
              <strong>Status:</strong>{" "}
              {pathwayService.taskStatus[this.props.taskStatus]}{" "}
            </p>
          ) : null}
         
        </Card.Body>
        <Card.Footer className="bg-dark">
            <Button
            
              className="mt-3 mynavback btn-outline-warning text-warning"
              exact
              href={`${this.props.baseURL}/pathways/progress/update/${this.props.pathwayTitle}`}
            >
              See more
            </Button>
          </Card.Footer>
      </Card>
      </section>

    );
  }
}
