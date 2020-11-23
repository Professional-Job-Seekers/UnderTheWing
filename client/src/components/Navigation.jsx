import React from "react";
import { Link, NavLink} from 'react-router-dom';

/* Auth */
import PrivateRoute from './PrivateRoute';
import AuthButton from './AuthButton';
import RegistrationButton from './RegistrationButton';


export default class Navigation extends React.Component {
  render() {
    return (
      <nav className="bg-dark navbar navbar-expand-md navbar-dark shadow mb-0  ">
        <Link className="navbar-brand" to="/">Under The Wing</Link>
        <ul className="navbar-nav mr-auto  "> 
          <li className="nav-item"> 
            <NavLink className="nav-link" exact to="/"> Home </NavLink>
          </li>
          <li className="nav-item"> 
            <NavLink className="nav-link" exact to="/userdash"> Dashboard </NavLink>
          </li>  
          <li className="nav-item"> 
            <NavLink className="nav-link" exact to="/pathway"> Pathways </NavLink>
          </li> 
          <li className="nav-item"> 
            <NavLink className="nav-link" exact to="/pathway-creator"> Creator </NavLink>
          </li> 
          <li className="nav-item"> 
            <NavLink className="nav-link" exact to="/event"> Events </NavLink>
          </li> 
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/about-us"> About Us </NavLink>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item mr-2"><AuthButton/></li>
          <li className="nav-item"><RegistrationButton/></li>
        </ul>
    </nav>  
  );}
}