import React from "react";
export default class Footer extends React.Component {
  render(){
    return (
      <footer id="footer">
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
              <a href="https://github.com/Professional-Job-Seekers/professional-ctp-project" className="icon fa-github" target="_blank" rel="noreferrer">
              <span className="label">GitHub</span></a>
            </li>
        </ul>
        <p className="copyright">Under The Wing © 2020</p>
      </div>
    </footer>
  );}
}
