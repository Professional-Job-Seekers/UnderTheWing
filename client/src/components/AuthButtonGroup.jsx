
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import auth from '../services/auth';
import {getCookie,setCookie} from '../services/cookies'

const classes = "btn btn-primary";

const AuthButtonGroup = withRouter(({ history }) => {
  const authCookieSet = getCookie("auth") === "true"; 
  if(!authCookieSet && !auth.isAuthenticated) {
    return (
      <div>
        <Link className={classes}  to="/login">Login</Link>
        <Link className="btn btn-primary ml-2" to="/register">Sign Up</Link>
      </div>
    );
  }
  
  const logout = () => {
    setCookie("auth", false);
    auth.isAuthenticated = false;
    auth.signout().then(() => history.push('/'));
  }
  
  return (
    <div>
      <button className={classes} onClick={logout}>Logout</button>
    </div>
  );
});

export default AuthButtonGroup;