import React from "react";
import Pics2 from "../assets/CompanyLogo.svg";
export default class Footer extends React.Component {
  render(){
    return (
      <footer id="footer">
        <div className="footer-main"> 
          <div className="footer-left">
            <div className="footer-left-content">
              <h3>Mentor & Make an Impact </h3>
              <ul className="footer-links"></ul>
            </div>
            <div className="footer-logo">
              <img id="CpLogo" src={Pics2} className="" alt="CompanyLogo" />
            </div>
          </div> 
          <div className="footer-right">
            <h3>Reach Out</h3>
            <p className="p-condensed">We Build Black</p>
            <p className="p-condensed">147 Front Street</p>
            <p>Brooklyn, NY 11201</p>
            <p>info@webuildblack.com</p>
            <h3>Stay in the loop</h3>
            <p>Be first to know about the latest community news, events, and job opportunities.</p>
          </div>
        </div>
       <div className="footer-end">  
          <ul className="icons">
            <li>
              <a href="https://instagram.com/webuildblack" className="icon fa-instagram" target="_blank" rel="noreferrer">
              <span className="label">Instagram</span></a>
            </li>
            <li>
              <a href="https://youtube.com/webuildblack" className="icon fa-youtube" target="_blank" rel="noreferrer">
              <span className="label">LinkedIn</span></a>
            </li>
            <li>
              <a href="https://linkedin.com/company/we-build-black" className="icon fa-linkedin" target="_blank" rel="noreferrer">
              <span className="label">LinkedIn</span></a>
            </li>
            <li>
              <a href="https://twitter.com/webuildblack" className="icon alt fa-twitter" target="_blank" rel="noreferrer">
              <span className="label">Twitter</span></a>
            </li>
            <li>
              <a href="https://facebook.com/WeBuildBlackOfficial" className="icon fa-facebook" target="_blank" rel="noreferrer">
              <span className="label">Facebook</span></a>
            </li>
            <li>
              <a href="https://github.com/WeBuildBlack" className="icon fa-github" target="_blank" rel="noreferrer">
              <span className="label">GitHub</span></a>
            </li>
        </ul>
        <p className="copyright">Under The Wing © 2020</p>
      </div>
    </footer>
  );}
}
