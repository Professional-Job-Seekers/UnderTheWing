import React from 'react';
import "../Style/card-style.css";

// export default class const Card = props => {

const Card = props => {
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgSrc} alt="" className="card-img-top" />
                <div className="card-body text-dark">
                <h4 className="card-title"> {props.title}: 0 </h4>
                
                {/* <p> Description </p> */}
                <a href='#' className="btn btn-outline-success"> Take a Look</a>
                </div>
            </div>
        </div>    
        
    );
}

export default Card;