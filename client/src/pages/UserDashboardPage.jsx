import "../styles/App.css";
import SpotlightObjectives from "../components/SpotlightObjectives";
import PathwayObjectives from "../components/PathwayObjectives";
import UserInfoMainCard from "../components/UserInfoMainCard";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row, Container } from "react-bootstrap";
import Pics from "../assets/UserLogo.svg";

export default class Dash extends Component {
  state = {
    pathways: [],
  };

  /* Fetch Data Here */
  async componentDidMount() {
    //   const pathwayData = await pathwayService.getAllPathways();
    //   const pathwayComponents = pathwayData.map(p =>  <Pathway baseURL = {this.props.match.url} pathwayTitle = {p.title}/>);
    //   this.setState({ pathways : pathwayComponents})
  }

  render() {
    return (
      <Container className="">
        <Row className="d-flex flex-row ">
          <Col className="d-flex flex-column">
            <Card bg="yellow" text="black" className="d-flex justify-content-center">
              <Card.Header>
                <Card.Img
                  className="mb-3 card-img-top overflow "
                  id="CpLogo"
                  src={Pics}
                  alt="Card image cap"
                />
                <h1>User</h1>
              </Card.Header>
              <Card.Body>
                <Card.Title>Primary Card Sub Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Title>Primary Card Sub Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <Card.Body>
              <PathwayObjectives></PathwayObjectives>

              </Card.Body>
              
              <Card.Body>
                <Card.Title>Primary Card Sub Title</Card.Title>

              </Card.Body>

              <Card.Footer className="text-muted">Test footer</Card.Footer>
            </Card>

            <SpotlightObjectives ></SpotlightObjectives>


            {/* <div className="">
              <div className="">
                <div className="">
                  <UserInfoMainCard/>
                  <PathwayObjectives></PathwayObjectives>
                  <SpotlightObjectives></SpotlightObjectives>

                  <div className="card ">

                  <div className="card-header bg-dark">
                  <img className="mb-3 card-img-top overflow " id="CpLogo" src={Pics} alt="Card image cap" />
                      <h1>User</h1>
                  </div>
                  <div className="card-body ">
                      <div className="card-content">
                          <h2>Bio</h2>

                          <div className="card-text">
                              akfkamfkmakfj
                              ka;lfk;alfkl;a
                              apkf[pawlf[p]]
                          </div>
                      </div>

                      <div className="card-content">
                          <h2>Achievments & Badges</h2>

                          <div className="card-text">
                              akfkamfkmakfj
                              ka;lfk;alfkl;a
                              apkf[pawlf[p]]
                          </div>
                      </div>

                      <div className="card-content">
                      <PathwayObjectives></PathwayObjectives>
                      </div>


                  </div>
                  </div>
                  <SpotlightObjectives></SpotlightObjectives>
                  
                  <SpotlightObjectives className="d-flex flex-row-reverse"></SpotlightObjectives>

                        <div className="row-fluid  ">

            
              </div>

                        {/* <h1>Pathway Offering</h1>
                      {this.state.pathways}  
                </div>
              </div>
            </div> */}
            
         

          </Col>
        </Row>

      </Container>
    );
  }
}
