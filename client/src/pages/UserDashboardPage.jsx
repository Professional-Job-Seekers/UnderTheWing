import "../styles/App.css";
import Tabs from "../components/Tabs";
import Card from "../Cards/ObjectiveCards";
import SpotlightCard from "../Cards/SpotlightCardUI";
import React, { Component } from "react";

export default function Dash(props) {
  state = {
    pathways : []
   }

   /* Fetch Data Here */
   async componentDidMount(){
    //  const pathwayData = await pathwayService.getAllPathways();
    //  const pathwayComponents = pathwayData.map(p =>  <Pathway baseURL = {this.props.match.url} pathwayTitle = {p.title}/>);
    //  this.setState({ pathways : pathwayComponents})
   }

  render() {
    return (
      <div className="container">
      <div className="row-fluid  ">
        <div className="col mx-auto ">
          <div className="card text-white bg-dark mb-3 col">
            <SpotlightCard></SpotlightCard>
          </div>
        </div>

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
    </div>
   );
 }
}
