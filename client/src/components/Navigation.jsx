import React from "react";
import { Link, NavLink } from 'react-router-dom';
import ProtectedLink from "./ProtectedLink";
import AuthButtonGroup from './AuthButtonGroup';
export default class Navigation extends React.Component {
  render() {
    return (
      <nav className="mynavback navbar navbar-expand-md navbar-dark shadow mb-0 container-fluid">
        <Link className="navbar-brand" to="/">Under The Wing</Link>
        <div class="mx-auto d-sm-flex d-block flex-sm-nowrap">
          <ul className="navbar-nav mr-auto  ">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/"> Home </NavLink>
            </li>
            <ProtectedLink URL="/userdash" linkDisplayText="Dashboard" checkType="" />
            <ProtectedLink URL="/pathway-creator" linkDisplayText="Creator" checkType="" />
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/pathway"> Pathways </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about-us"> About Us </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/mentor"> Our Mentors </NavLink>
            </li>
          </ul>
        </div>
        <ul className="nav navbar-nav navbar-right ">
          <li className="nav-item"><AuthButtonGroup /></li>
        </ul>
      </nav>
    );
  }
}