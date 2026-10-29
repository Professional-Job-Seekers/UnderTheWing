import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import auth from '../services/auth';
import { DEMO_PASSWORD, DEMO_ROLES } from '../config/demo';
import '../styles/login.css';

class DemoRoleLogin extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = { failed: false, signingIn: null, done: false };

  signIn = async ({ role, username }) => {
    this.setState({ failed: false, signingIn: role });
    try {
      await auth.signInAs(username, DEMO_PASSWORD);
      this.setState({ done: true });
    } catch (err) {
      auth.isAuthenticated = false;
      this.setState({ failed: true, signingIn: null });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/userdash' } };
    if (this.state.done) return <Redirect to={from} />;
    return (
      <main className="container py-4">
        <h1>Try the demo</h1>
        <p className="text-muted">Pick a role to explore the app. No account or password needed; the demo data is shared, so what you change is visible to the next visitor.</p>
        {this.state.failed && <div className="alert alert-danger" role="alert">Could not start the demo. The server may be waking up: wait a few seconds and try again.</div>}
        <div className="row justify-content-center g-3">
          {DEMO_ROLES.map(item => (
            <div className="col-12 col-md-5" key={item.role}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <p className="card-text flex-grow-1">{item.blurb}</p>
                  <button className="btn btn-primary" type="button" disabled={this.state.signingIn !== null} onClick={() => this.signIn(item)}>
                    {this.state.signingIn === item.role ? 'Signing in…' : item.label}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default withRouter(DemoRoleLogin);
