import React, { Component } from "react";
import Pics from "../assets/campaign-objective-icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";


let ObjectiveNum = 0;


export default class MentorObjectives extends Component {
    
  render() {
      
    return (
        
      <div className="container-fluid d-flex justify-content-center bg-dark">
        <div className="row ">
          {/* create for loop and also iterate objective */}
          for(let i = 0; i <= 4; i++ ){
            
          }
          <div className="col-sm-3 text-center shadow ">
              <Card className="mb-3 card-img-top overflow " >
                 <Card.Body>
                 <Card.Img src={Pics} />
                 </Card.Body>
                 <Card.Title>Objective </Card.Title>
                 <Card.Subtitle> 0 </Card.Subtitle>
                 <a href='http://localhost:4960/pathway' className="btn btn-outline-success">Take a Look</a>
                </Card>          
                </div>

                <div className="col-sm-3 text-center shadow ">
              <Card className="mb-3 card-img-top overflow " >
                 <Card.Body>
                 <Card.Img src={Pics} />
                 </Card.Body>
                 <Card.Title>Objective </Card.Title>
                 <Card.Subtitle> 0 </Card.Subtitle>
                 <a href='http://localhost:4960/pathway' className="btn btn-outline-success">Take a Look</a>
                </Card>          
                </div>

                <div className="col-sm-3 text-center shadow ">
              <Card className="mb-3 card-img-top overflow " >
                 <Card.Body>
                 <Card.Img src={Pics} />
                 </Card.Body>
                 <Card.Title>Objective </Card.Title>
                 <Card.Subtitle> 0 </Card.Subtitle>
                 <a href='http://localhost:4960/pathway' className="btn btn-outline-success">Take a Look</a>
                </Card>          
                </div>

                <div className="col-sm-3 text-center shadow ">
              <Card className="mb-3 card-img-top overflow " >
                 <Card.Body>
                 <Card.Img src={Pics} />
                 </Card.Body>
                 <Card.Title>Objective </Card.Title>
                 <Card.Subtitle> 0 </Card.Subtitle>
                 <a href='http://localhost:4960/pathway' className="btn btn-outline-success">Take a Look</a>
                </Card>          
                </div>
                
        
        </div>
        
      </div>
    );
  }
}
