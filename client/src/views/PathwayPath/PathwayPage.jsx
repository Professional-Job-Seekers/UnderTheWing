import React, { Component } from "react";
import Tabs from "../../components/Tabs";
import Card from "../../Cards/Cards";
import SpotlightCard from "../../Cards/SpotlightCardUI";

import "../../App.css";

export default class Pathway extends Component {
  // constructor(props) {
  //   super(props);

  //   function Reasd(){

  //   }

  // }
  // can import cards from bootstrap too 

  render() {
    return (
      <div className="container">

      {/* <div className="container"> */}
            <div className="row-fluid  ">
        <div className="card text-white bg-dark mb-3 col">
            <SpotlightCard></SpotlightCard>
          </div>
        {/* </div> */}
      {/* </div> */}
      {/* <div className="container"> */}
        {/* <div className="row-fluid"> */}
         
          <div className="col">

          <h1>Pathway</h1>
          <Tabs>
            <div label="Scientific Researcher">
              <Card></Card>
            </div>
            <div label="Software Development">
              <Card></Card>
            </div>
            <div label="Engineer">
              <Card></Card>
            </div>
            <div label="Mathematician">
              <Card></Card>
            </div>
          </Tabs>
          </div>

        </div>
    
      {/* </div> */}
      </div>

    );
  }
}
