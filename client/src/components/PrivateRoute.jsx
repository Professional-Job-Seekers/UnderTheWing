import React from 'react';
import{ Redirect, Route } from 'react-router-dom';

import auth from '../services/auth';

// The role cookie outlives a page refresh; the in-memory flag does not.
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.hasSession()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

export default PrivateRoute;
