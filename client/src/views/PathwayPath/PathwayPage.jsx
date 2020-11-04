import React, { Component } from "react";
import Tabs from "../../components/Tabs"; 
import '../../App.css';
import { Button } from 'react-bootstrap'; // go back react bootstrap vid


export default class Pathway extends Component {
 

  render() {
    return (
      <div>
         <h1>Pathway</h1>
         <Tabs> 
       <div label="Gator"> 
         See ya later, <em>Alligator</em>! 
       </div> 
       <div label="Croc"> 
         After 'while, <em>Crocodile</em>! 
       </div> 
       <div label="Sarcosuchus"> 
         Nothing to see here, this tab is <em>extinct</em>! 
       </div> 
     </Tabs> 

      </div>
    );
  }
}
