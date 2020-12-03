import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Styles */
import './styles/App.css';
/* Pages*/ 
import AboutUsPage from './pages/AboutUsPage';
import UserDashboardPage from './pages/UserDashboardPage'
import HomePage from './pages/HomePage';
import MentorPage from './pages/MentorPage';
import TaskStatusPage from './pages/TaskStatusPage';

import TaskDetail from './components/TaskDetail';

import MentorMatchResultPage from './pages/redirects/MentorMatchResultPage';

// Pathways
import PathwayPage from "./pages/PathwayPage";
import PathwayDetailPage from "./pages/PathwayDetailPage";
import PathwayCommitPage from "./pages/PathwayCommitPage";
import PathwayCreatorPage from "./pages/PathwayCreatorPage";
// Auth
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
/* Components */
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

/* Core Features */
import Events from "./views/NetworkingMeetups/EventCalender";

export default class App extends React.Component {
  render() {
    return (
      <main class="mavens-module--Main--1u7R7">
        <>
          <div className="Content">
         
      <Router>
        <Navigation/>
        <div className="container-fluid text-center wrap" >
          <div className="row justify-content-center" >
            <Switch>
              {/* SUB-ROUTES */}
              <Route exact path ="/pathway/pathway-detail/:pathway" component={PathwayDetailPage}/>
              <Route exact path ="/pathway/commit/:pathway" component={PathwayCommitPage}/>
              {/* BASE ROUTES */}
              <Route exact path ="/mentor/match/:mentor" component={MentorMatchResultPage}/>
              <Route exact path ="/login" component={LoginPage}/>
              <Route exact path ="/pathway" component={PathwayPage}/>
              <Route exact path ="/pathway-creator" component={PathwayCreatorPage}/>

              <Route exact path ="/userdash" component={UserDashboardPage}/>
              <Route path="/about-us" component={AboutUsPage} />
              <Route exact path ="/register" component={RegistrationPage}/>
              <Route exact path ="/event" component={Events}/>
              <Route exact path ="/mentor" component={MentorPage}/>
              {/* <Route exact path ="/taskstatus" component={TaskStatusPage}/> */}
              {/* <Route exact path ="/userdash/taskstatus/:userdash" component={TaskStatusPage}/> */}
              {/* <Route exact path ="/taskdetail" component={TaskDetail}/> */}

              <Route exact path ="/progress/update/:pathway" component={TaskStatusPage}/>
              {/* <Route exact path ="/task" component={TaskStatusPage}/> */}


                <Route exact path="/" component={HomePage} />
                {/* NOT FOUND */}
                <Route path="*" component={NotFoundPage} />
              </Switch>
              </div>
              </div>

            </Router>
          </div>
          <Footer className="Footer" />
        </>
      </main>
    );
  }
}
