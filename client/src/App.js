import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/* Styles */
import './styles/App.css';
/* Pages*/ 
import AboutUsPage from './pages/AboutUsPage';
// import UserDashboardPage from './pages/UserDashboardPage'
// Pathways
import PathwayPage from './pages/PathwayPage';
import PathwayDetailPage from './pages/PathwayDetailPage';
import PathwayCommitPage from './pages/PathwayCommitPage';
// Auth 
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
/* Components */
import Navigation from './components/Navigation';
import Footer from './components/Footer';
/* Core Features */
import Events from './views/NetworkingMeetups/EventCalender';


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation/>
        <div className="container-fluid text-center" >
          <div className="row justify-content-center" >
            <Switch>
              {/* SUB-ROUTES */}
              <Route exact path ="/pathway/pathway-detail/:pathway" component={PathwayDetailPage}/>
              <Route exact path ="/pathway/commit/:pathway" component={PathwayCommitPage}/>
              {/* BASE ROUTES */}
              <Route exact path ="/login" component={LoginPage}/>
              <Route exact path ="/pathway" component={PathwayPage}/>
              <Route exact path ="/dashboard" component={PathwayPage}/>
              <Route path="/about-us" component={AboutUsPage} />
              <Route exact path ="/register" component={RegistrationPage}/>
              <Route exact path ="/event" component={Events}/>
              {/* NOT FOUND */}
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </div>
        </div>
        <Footer/>
      </Router>
    );
  }
}