import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegistrationPage';
import Pathway from './views/PathwayPath/PathwayPage';
import Events from './views/NetworkingMeetups/EventCalender';
import AboutUsPage from './pages/AboutUsPage';

// import HomeSchedule from './views/NetworkingMeetups/homeSchedule';
// import { Button } from 'react-bootstrap';

import './App.css';
import './Style/banner.css';
import Pics2 from "./assets/CompanyLogo.svg";




function Banner(props) {
  return (
    <div className="jumbotron-fluid mx-auto ">
	
  <div className="container1 img-fluid  "  alt="Responsive image">
  <div className="row mx-md-n5 ">

    <center>
    {/* <h1>Under the Wing</h1> */}
    <img src={Pics2} className="img-fluid w-25 p-3 " alt="CompanyLogo" />

    {/* <img id="CpLogo2" src={Pics2} className="" alt="CompanyLogo" /> */}
    </center>
  

    <div className="bird-container bird-container--one">
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
  </div>


    </div>
    

  );
}

function Navigation(props) {
  return (
    <div className="bg-dark "  >
      <Banner/>
      <nav className="navbar navbar-expand-sm navbar-dark shadow mb-3">
      <Link className="navbar-brand" to="/">Under The Wing</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item"> 
          {/* exact: bool When true, the active class/style will only be applied if the location is matched exactly. */}
          <NavLink className="nav-link" exact to="/login">
           Login
          </NavLink>
        </li> 
        <li className="nav-item"> 
          <NavLink className="nav-link" exact to="/register">
           Registration
          </NavLink>
        </li> 
        <li className="nav-item"> 
          <NavLink className="nav-link" exact to="/pathway">
          Pathway
          </NavLink>
        </li> 
        <li className="nav-item"> 
          <NavLink className="nav-link" exact to="/event">
          Events
          </NavLink>
        </li> 
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
          </NavLink>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>
    
    </div>
    
  );
}



function Myfooter(props) {
  return (
    <footer id="footer">

      <div className="footer-main"> 
      <div className="footer-left">
      <div className="footer-left-content">
        <h3>Mentor & Make an Impact </h3>
        <ul className="footer-links">
          

        </ul>

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
      <li><a href="https://instagram.com/webuildblack" className="icon fa-instagram" target="_blank" rel="noreferrer">
      <span className="label">Instagram</span>
      </a>
      </li>
      <li>
      <a href="https://youtube.com/webuildblack" className="icon fa-youtube" target="_blank" rel="noreferrer">
      <span className="label">LinkedIn</span>
      </a>
      </li>
      <li>
      <a href="https://linkedin.com/company/we-build-black" className="icon fa-linkedin" target="_blank" rel="noreferrer">
      <span className="label">LinkedIn</span>
      </a>
      </li>
      <li><a href="https://twitter.com/webuildblack" className="icon alt fa-twitter" target="_blank" rel="noreferrer">
      <span className="label">Twitter</span>
      </a>
      </li>
      <li>
      <a href="https://facebook.com/WeBuildBlackOfficial" className="icon fa-facebook" target="_blank" rel="noreferrer">
      <span className="label">Facebook</span>
      </a>
      </li>
      <li>
      <a href="https://github.com/WeBuildBlack" className="icon fa-github" target="_blank" rel="noreferrer">
      <span className="label">GitHub</span>
      </a>
      </li>
      </ul>
      <p className="copyright">Under The Wing © 2020</p>

      </div>
      
    </footer>
        

  );
}


class App extends React.Component {
  render() {
    return (
        <Router   >
          <Navigation />
          {/* <div className="container-fluid text-center" style={{backgroundColor: '#a37d1c'}}> */}
          <div className="container-fluid text-center" >

            <div className="row justify-content-center" >
              <Switch>
                <Route path="/about-us" component={AboutUsPage} />
                <Route exact path ="/login" component={Login}/>
                <Route exact path ="/register" component={Register}/>
                <Route exact path ="/pathway" component={Pathway}/>
                <Route exact path ="/event" component={Events}/>
                {/* <Route exact path ="/event" component={HomeSchedule}/> */}
              </Switch>
            </div>

          </div>
          <Myfooter/>

        </Router>
        
    );
  }
}


export default App;
