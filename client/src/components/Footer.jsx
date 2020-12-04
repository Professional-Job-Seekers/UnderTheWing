import React from "react";
import '../styles/footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <div className="footer-end">
          <p className="copyright">Under The Wing © 2020</p>
        </div>
      </footer>
    );
  }
}

/*
import CompanyLogo from "../assets/CompanyLogo.svg";
        <div className="footer-main ">
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
            <h3>Stay in the loop</h3>
            <p>Be first to know about the latest community news, events, and job opportunities.</p>
          </div>
        </div>
*/