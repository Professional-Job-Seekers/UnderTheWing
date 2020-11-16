import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import Login from './views/Accounts/LoginPage';
import Register from './views/Accounts/RegisterPage';
import Pathway from './views/PathwayPath/PathwayPage';
import Events from './views/NetworkingMeetups/EventCalender';
import AboutUsPage from './pages/AboutUsPage';

// import HomeSchedule from './views/NetworkingMeetups/homeSchedule';
// import { Button } from 'react-bootstrap';

import './App.css';
import './Style/banner.css';



function Banner(props) {
  return (
    <div className="jumbotron-fluid mx-auto ">
	
  <div className="container1 img-fluid  "  alt="Responsive image">
  <div className="row mx-md-n5 ">

 
    <h1>Under the Wing</h1>
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
      
            
     </div>
      
    </footer>
        

  );
}


class App extends React.Component {
  render() {
    return (
        <Router   >
          <Navigation />
          <div className="container-fluid text-center" style={{backgroundColor: '#a37d1c'}}>
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
