import React from 'react';
import aboutStrings from '../text/aboutUs'
import '../styles/App.css'

function AboutUsPage(props) {
  return (
    <div>

      <div className="about-section m-4 ml-5 mr-5">
        <h1>About Us </h1>
        <p className="text-left">{aboutStrings.utwPitch}</p>
        <p className="text-left pt-3">{aboutStrings.utwDetail}</p>
      </div>
      <div className="container-fluid">
        <div class="row ml-5 mr-5">
          <div class="card col-6 p-3">
              <h2>Joshua Carpentier</h2>
              <p className="font-italic">Co-Founder & Full Stack Developer</p>
              <p><a href="https://github.com/jacgit18" target="_blank"> github.com/jacgit18</a></p>
          </div>
          <div class="card col-6 p-3">
              <h2>Muneeb Khawaja</h2>
              <p className="font-italic">Co-Founder & Full Stack Developer</p>
              <p><a href="https://github.com/mtkhawaja" target="_blank"> github.com/mtkhawaja</a></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUsPage;