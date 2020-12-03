import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/* Styles */
import './styles/App.css';
/* Pages*/
import AboutUsPage from './pages/AboutUsPage';
import UserDashboardPage from './pages/UserDashboardPage'
import HomePage from './pages/HomePage';
import MentorPage from './pages/MentorPage';
import MentorMatchResultPage from './pages/redirects/MentorMatchResultPage';
import TaskStatusPage from './pages/TaskStatusPage';
/* Pathways */
import PathwayPage from "./pages/PathwayPage";
import PathwayDetailPage from "./pages/PathwayDetailPage";
import PathwayCommitPage from "./pages/PathwayCommitPage";
import PathwayCreatorPage from "./pages/PathwayCreatorPage";
/* Auth */
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
      <div>
        <div className="content">
          <Router>
            <Navigation/>
            <div className="container-fluid text-center">
              <div className="row justify-content-center">
                <Switch>
                  {/* SUB-ROUTES */}
                  <Route exact path="/userdash/pathways/progress/active-pathway-task/:activeTask" component={TaskStatusPage} />
                  <Route exact path="/pathway/commit/:pathway" component={PathwayCommitPage} />
                  <Route exact path="/pathway/pathway-detail/:pathway" component={PathwayDetailPage} />
                  <Route exact path="/mentor/match/:mentor" component={MentorMatchResultPage} />
                  {/* BASE ROUTES */}
                  <Route exact path="/pathway-creator" component={PathwayCreatorPage} />
                  <Route exact path="/userdash" component={UserDashboardPage} />
                  <Route exact path="/event" component={Events} />
                  <Route exact path="/mentor" component={MentorPage} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/register" component={RegistrationPage} />
                  <Route excat path="/about-us" component={AboutUsPage} />
                  <Route exact path="/pathway" component={PathwayPage} />
                  {/* NOT FOUND */}
                  <Route exact path="/" component={HomePage} />
                  <Route path="*" component={NotFoundPage} />
                </Switch>
              </div>
            </div>
          </Router>
        </div>
        <Footer/>
      </div>
    );
  }
}
