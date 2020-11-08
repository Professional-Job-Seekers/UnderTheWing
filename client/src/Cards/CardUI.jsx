import React from 'react';
import ObjTarg from '../assets/campaign-objective-icon.svg';


// export default class const Card = props => {
let ObjectiveNum = 0;

const Card = props => {
    return (
        <div className="card text-center">
            <div className="overflow">
                <img src={ObjTarg} alt="" />
                <p> Objective {ObjectiveNum} </p>
            </div>
        </div>    
        
    );
}

export default Card;