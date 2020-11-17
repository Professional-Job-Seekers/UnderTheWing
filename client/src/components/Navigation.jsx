import React from "react";
import { Redirect } from 'react-router-dom';
import { Link, NavLink} from 'react-router-dom';

/* Auth */
import PrivateRoute from './PrivateRoute';
import AuthButton from './AuthButton';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="bg-dark "  >
        <nav className="navbar navbar-expand-sm navbar-dark shadow mb-3">
          <Link className="navbar-brand" to="/">Under The Wing</Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"> 
              <NavLink className="nav-link" exact to="/register"> Registration </NavLink>
            </li> 
            <li className="nav-item"> 
              <NavLink className="nav-link" exact to="/pathway"> Pathway </NavLink>
            </li> 
            <li className="nav-item"> 
              <NavLink className="nav-link" exact to="/event"> Events </NavLink>
            </li> 
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about-us"> About Us </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <AuthButton/>
      </nav>  
    </div>  
  );}
}