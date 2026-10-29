
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
        <Link className={classes}  to="/login"> <strong>Try the demo</strong></Link>
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
      <Link className={classes} to="/login"> <strong>Switch role</strong></Link>
      <button className={`${classes} ms-2`} onClick={logout}> <strong> Exit demo </strong> </button>
    </div>
  );
});

export default AuthButtonGroup;