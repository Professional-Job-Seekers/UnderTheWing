
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import auth from '../services/auth';


const classes = "btn btn-primary";

const RegistrationButton = withRouter(({ history }) => {
  if(auth.isAuthenticated) {
    return (null);
  }
  return <Link className={classes} to="/register">Sign Up</Link>;
});

export default RegistrationButton;
