import React from "react";
import {getCookie} from "../services/cookies"
import { NavLink} from 'react-router-dom';

export default class ProtectedLink extends React.Component {
    render() {
        let check = true;
        if(this.props.checkType === "auth"){
            check = getCookie('auth');
        } else if (this.props.checkType === "mentor"){
            check = getCookie('user_type') === "mentor" ? true: false;
        }
        if (!check){
            return (null);
        }
        return (
            <li className="nav-item">
                <NavLink className="nav-link" exact to={this.props.URL}>  
                    {this.props.linkDisplayText} 
                </NavLink>
            </li>
        )
    }
}