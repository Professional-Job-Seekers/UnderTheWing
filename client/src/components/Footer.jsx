import React from "react";
import CompanyLogo from "../assets/CompanyLogo.svg";
import '../styles/App.css';


export default class Footer extends React.Component {
  render(){
    return (
      <footer id="footer">
        {/* <div className="footer-main "> 
          <div className="footer-left">
            <div className="footer-left-content">
              <h3>Mentor & Make an Impact </h3>
              <ul className="footer-links"></ul>
            </div>
            <div className="footer-logo">
              <img id="CpLogo" src={CompanyLogo} className="" alt="CompanyLogo" />
            </div>
          </div> 
          <div className="footer-right">
            <h3>Reach Out</h3>
            <p className="p-condensed">Under the Wing</p>
            <p>joshuacarpentier21@gmail.com</p>
            <p>muneebtahirkhawaja@gmail.com</p>
            <h3>Stay in the loop</h3>
            <p>Be first to know about the latest community news, events, and job opportunities.</p>
          </div>
        </div> */}
       <div className="footer-end">  
          <ul className="icons">
            <li>
              <a href="https://www.linkedin.com/in/joshua-carpentier/" className="icon fa-youtube" target="_blank" rel="noreferrer">
              <span className="label">Joshua-LinkedIn</span></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/muneebtkhawaja/" className="icon fa-linkedin" target="_blank" rel="noreferrer">
              <span className="label">Muneeb-LinkedIn</span></a>
            </li>
            <li>
              <a href="https://github.com/Professional-Job-Seekers/professional-ctp-project"  className="icon fa-github" target="_blank" rel="noreferrer">
              <img src="../assets/iconmonstr-github-1.svg" alt=""/>
              <span className="label">GitHub</span></a>
            </li>
        </ul>
        <p className="copyright">Under The Wing © 2020</p>
      </div>
    </footer>
  );}
}
