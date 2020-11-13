import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import PostFormPage from './pages/PostFormPage';
import ShowPostPage from './pages/ShowPostPage';
import AboutUsPage from './pages/AboutUsPage';
import Login from './views/Accounts/LoginPage';
import Register from './views/Accounts/RegisterPage';
import Pathway from './views/PathwayPath/PathwayPage';
import Events from './views/NetworkingMeetups/EventCalender';
// import HomeSchedule from './views/NetworkingMeetups/homeSchedule';
// import { Button } from 'react-bootstrap';




import './App.css';
import './Style/banner.css';



function Banner(props) {
  return (
    <div className=" jumbotron-fluid ">
	

  <div class="container1">
    <h1>Under the Wing</h1>
    <div class="bird-container bird-container--one">
      <div class="bird bird--one"></div>
    </div>
    <div class="bird-container bird-container--two">
      <div class="bird bird--two"></div>
    </div>
    <div class="bird-container bird-container--three">
      <div class="bird bird--three"></div>
    </div>
    <div class="bird-container bird-container--four">
      <div class="bird bird--four"></div>
    </div>
  </div>



    </div>
    

  );
}

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/">Micro Blog</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/new">
            Create a Micro Post
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
          </NavLink>
        </li>
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
      </ul>
    </nav>
  );
}

function Myfooter(props) {
  return (
    <div className="container-fluid ">

    </div>
    

  );
}


class App extends React.Component {
  render() {
    return (
        <Router>
          <Banner/>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/posts/new" component={PostFormPage} />
                <Route path="/posts/:id" component={ShowPostPage} />
                <Route path="/about-us" component={AboutUsPage} />
                <Route exact path ="/login" component={Login}/>
                <Route exact path ="/register" component={Register}/>
                <Route exact path ="/pathway" component={Pathway}/>
                <Route exact path ="/event" component={Events}/>
                {/* <Route exact path ="/event" component={HomeSchedule}/> */}



                <Route path="/" component={PostsListPage} />
              </Switch>
            </div>
          </div>
          <Myfooter/>
        </Router>
    );
  }
}


export default App;