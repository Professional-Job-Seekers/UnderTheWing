import React from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import { isPages, hasBackend } from './config/deployment';

function BackendPreview() {
  return <section className="container py-5" role="status">
    <h1>Frontend preview</h1>
    <p>This preview is not connected to a backend. Accounts, mentors, and pathways are available when running the full app.</p>
  </section>;
}

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
    const Router = isPages() ? HashRouter : BrowserRouter;
    const backendPage = Page => hasBackend() ? Page : BackendPreview;
    return (
      <div>
        <div className="content">
          <Router>
            <Navigation/>
            <div className="container-fluid text-center">
              <div className="row justify-content-center">
                <Switch>
                  {/* SUB-ROUTES */}
                  <Route exact path="/userdash/pathways/progress/active-pathway-task/:activeTaskId/:activeTask" component={backendPage(TaskStatusPage)} />
                  <Route exact path="/pathway/commit/:pathway" component={backendPage(PathwayCommitPage)} />
                  <Route exact path="/pathway/pathway-detail/:pathway" component={backendPage(PathwayDetailPage)} />
                  <Route exact path="/mentor/match/:mentor" component={backendPage(MentorMatchResultPage)} />
                  {/* BASE ROUTES */}
                  <Route exact path="/pathway-creator" component={backendPage(PathwayCreatorPage)} />
                  <Route exact path="/userdash" component={backendPage(UserDashboardPage)} />
                  <Route exact path="/event" component={backendPage(Events)} />
                  <Route exact path="/mentor" component={backendPage(MentorPage)} />
                  <Route exact path="/login" component={backendPage(LoginPage)} />
                  <Route exact path="/register" component={backendPage(RegistrationPage)} />
                  <Route exact path="/about-us" component={AboutUsPage} />
                  <Route exact path="/pathway" component={backendPage(PathwayPage)} />
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
