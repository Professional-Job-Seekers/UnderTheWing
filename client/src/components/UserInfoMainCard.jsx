import React from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Pics from "../assets/UserLogo.svg";
// import MainCard from "../Cards/MainCard";

export default class UserInfoMainCard extends React.Component{    
  render(){
    return (
           
        // <MainCard/>

          <Card className="mb-3 card-img-top overflow">
            <Card.Header>

            <Card.Img src={Pics} />
            </Card.Header>
            <Card.Body>

              <Card.Content>
                <Card.Title> Bio </Card.Title>
                <Card.Text> Test </Card.Text>
              </Card.Content>

              <Card.Content>
                <Card.Title>Achievments </Card.Title>
                <Card.Text> Test </Card.Text>
              </Card.Content>

              <Card.Content>
                <Card.Title> Pathways </Card.Title>
                <Card.Text> Test </Card.Text>
              </Card.Content>
            </Card.Body>

          </Card>

    
    );
  }
}

