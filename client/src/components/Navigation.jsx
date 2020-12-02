import React from "react";
import { Link, NavLink} from 'react-router-dom';
// import CompanyLogo from "../assets/CompanyLogo.svg";
import {FaTwitter}  from 'react-icons/fa';
import {IconContext} from 'react-icons';

// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink
// } from './NavbarElements';

/* Auth */
import AuthButtonGroup from './AuthButtonGroup';

export default class Navigation extends React.Component {
  render() {
    return (
      <IconContext.Provider value={{color: "cornflowerblue", size: "4em"}}>
      <>

      <nav className="bg-dark navbar navbar-expand-md navbar-dark shadow mb-0 container-fluid ">
        <Link className="navbar-brand" to="/">Under The Wing</Link> 

        <div class="mx-auto d-sm-flex d-block flex-sm-nowrap">

        <FaTwitter/>

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

          {/* <Link className="navbar-brand" to="/">Under The Wing</Link>  */}

          {/* <Link className="navbar-brand mr-auto" to="/">  
            <img src={CompanyLogo} id="CpLogo"  alt=""/>
            </Link> */}

          <li className="nav-item"> 
            <NavLink className="nav-link" exact to="/pathway-creator"> Creator </NavLink>
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
          <li className="nav-item"><AuthButtonGroup/></li>
        </ul>
    </nav>  
    </>
    </IconContext.Provider>
  );}
}