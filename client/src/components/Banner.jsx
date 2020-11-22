/* UTW Banner / Graphic */
// import HomeSchedule from './views/NetworkingMeetups/homeSchedule';
// import { Button } from 'react-bootstrap';
import '../styles/banner.css';
import React from "react";
import { withRouter, Link } from 'react-router-dom';

export default class Banner extends React.Component{
  render(){
    return (
      
      <div className="banner-container">
        <blockquote class="blockquote quote-text">
          <p class="mb-0"> Life’s most persistent and urgent question is, ‘What are you doing for others?’</p>
          <p class="mb-3"> ~ Dr. Martin Luther King </p>
        </blockquote>
        <div className="bird-container bird-container--one ">
          <div className="bird bird--one"></div>
        </div>
        <div className="bird-container bird-container--two">
          <div className="bird bird--two"></div>
        </div>
        <div className="bird-container bird-container--three">
          <div className="bird bird--three"></div>
        </div>
        <div className="bird-container bird-container--four">
          <div className="bird bird--four"></div>
        </div>

      </div>
    );
  }
}

