import "../styles/App.css";
import SpotlightObjectives from "../components/SpotlightObjectives";
import PathwayObjectives from "../components/PathwayObjectives";
import UserInfoMainCard from "../components/UserInfoMainCard";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
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
      <div className="container d-flex p-2 ">
        <div className="row-fluid d-flex flex-row  ">
        {/* <UserInfoMainCard/> */}
        {/* <PathwayObjectives></PathwayObjectives>
        <SpotlightObjectives></SpotlightObjectives> */}

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
            

        </div>

        {/* <div className="row-fluid  ">

       
        </div> */}

          {/* <h1>Pathway Offering</h1>
                {this.state.pathways}  */}

      </div>
      
    );
  }
}
