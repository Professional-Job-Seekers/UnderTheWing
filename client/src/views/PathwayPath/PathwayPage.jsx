import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter, Route } from "react-router-dom";
// eslint-disable-next-line
import ReactDOM from "react-dom";
import Tabs from "../../components/Tabs";
import Card from "../../Cards/ObjectiveCards";
import SpotlightCard from "../../Cards/SpotlightCardUI";


export default class Pathway extends Component {
  // constructor(props) {
  //   super(props);

  //   function Reasd(){

  //   }

  // }

  render() {
    return (
      <div className="container">
        {/* <div className="container"> */}
        <div className="row-fluid  ">
          <div className="col mx-auto ">
            <div className="card text-white bg-dark mb-3 col">
              <SpotlightCard></SpotlightCard>
            </div>
          </div>

          {/* </div> */}
          {/* </div> */}
          {/* <div className="container"> */}
          {/* <div className="row-fluid"> */}

          <div className="col mx-auto ">
            <h1>Pathway</h1>
            <Tabs>
              <div label="Scientific Researcher" className="">
                <Card></Card>
              </div>
              <div label="Software Development" className="">
                <Card></Card>
              </div>
              <div label="Engineer" className="">
                <Card></Card>
              </div>
              <div label="Mathematician" className="">
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
