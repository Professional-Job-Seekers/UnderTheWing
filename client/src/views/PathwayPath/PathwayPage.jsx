import React, { Component } from "react";
import Tabs from "../../components/Tabs";
import Card from "../../Cards/CardUI";
import SpotlightCard from "../../Cards/SpotlightCardUI";

import "../../App.css";

export default class Pathway extends Component {
  // constructor(props) {
  //   super(props);

  //   function Reasd(){

  //   }

  // }

  render() {
    return (
      <div>
        <div>
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

        <div class="">
          <div>
            <SpotlightCard></SpotlightCard>
          </div>
        </div>
      </div>
    );
  }
}
