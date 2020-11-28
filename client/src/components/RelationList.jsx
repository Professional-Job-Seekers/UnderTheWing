import React from "react";

export default class RelationList extends React.Component {
    constructor(props) {
        super(props);
        this.getRelatedUsers = this.getRelatedUsers.bind(this);
    }
    getRelatedUsers(){
        return (null);
    }
    render(){
        return ( 
            <div>
                <h1> Your {this.props.relation} </h1>
                {this.getRelatedUsers()}
            </div>   
        )
    }
}