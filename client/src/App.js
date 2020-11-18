import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/* APP */ 
import './styles/App.css';
import AboutUsPage from './pages/AboutUsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
/* Core Features */
import PathwayPage from './pages/PathwayPage';
import PathwayDetailPage from './pages/PathwayDetailPage';
import Events from './views/NetworkingMeetups/EventCalender';

// Removed Banner for now. Add <Banner/> anywhere in return to see banner.
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
              {/* BASE ROUTES */}
              <Route exact path ="/login" component={LoginPage}/>
              <Route exact path ="/pathway" component={PathwayPage}/>
              <Route exact path ="/dashboard" component={PathwayPage}/>
              <Route path="/about-us" component={AboutUsPage} />
              <Route exact path ="/register" component={RegistrationPage}/>
              <Route exact path ="/event" component={Events}/>
              {/* NOT FOUND */}
              <Route path="*" component={NotFoundPage} />
              {/* <Route exact path ="/event" component={HomeSchedule}/> */}
            </Switch>
          </div>
        </div>
        <Footer/>
      </Router>
    );
  }
}