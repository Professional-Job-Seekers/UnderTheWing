
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import auth from '../services/auth';
import {getCookie,setCookie} from '../services/cookies'

const classes = "btn btn-dark btn-outline-warning";

const AuthButtonGroup = withRouter(({ history }) => {
  const authCookieSet = getCookie("auth") === "true"; 
  if(!authCookieSet && !auth.isAuthenticated) {
    return (
      <div>
        <Link className={classes}  to="/login"> <strong>Login</strong></Link>
        <Link className="btn btn-dark btn-outline-warning ml-2" to="/register"> <strong> Sign Up </strong> </Link>
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
      <button className={classes} onClick={logout}> <strong> Logout </strong> </button>
    </div>
  );
});

export default AuthButtonGroup;