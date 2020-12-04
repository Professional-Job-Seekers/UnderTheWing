import React, { Component } from "react";
import '../styles/App.css'
import pathwayService from '../services/pathway';
import Pathway from "../components/pathway-components/Pathway";

export default class PathwayPage extends Component {
  state = {
    pathways: []
  }
  /* Fetch Data Here */
  async componentDidMount() {
    const pathwayData = await pathwayService.getAllPathways();
    const pathwayComponents = pathwayData.map(p =>
      <Pathway
        baseURL={this.props.match.url}
        pathwayTitle={p.title}
        pathwayDescription = {p.description}
      />);
    this.setState({ pathways: pathwayComponents })
  }

  render() {
    return (
      <div>
        <h1 className="mt-3 mb-3 mytitle">Pathway Offering</h1>
        {this.state.pathways}
      </div>
    );
  }
}


