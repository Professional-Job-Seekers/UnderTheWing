/*Styles*/
import '../styles/App.css'
import "../styles/MentorCard.css";
import "../styles/card-style.css"
/*Services*/
import pathwayService from '../services/pathway';
/*Components*/
import React from 'react';
import PathwayTask from '../components/pathway-components/PathwayTask';
import { Card, Button } from "react-bootstrap";

export default class PathwayDetailPage extends React.Component {
  state = {
    pathway: "",
    tasks : [] 
   }
   /* Fetch Data Here */
   async componentDidMount(){
    const pathwayTitle = this.props.match.params.pathway;
    const pathwayData = await pathwayService.getPathway(pathwayTitle);
    const tasks = pathwayData.pathway.tasks.map(task => <PathwayTask taskDescription = {task.description} taskTitle = {task.title} />);
    this.setState({
      pathway: pathwayTitle,
      tasks : tasks,   
    });
  }
  render(){
    return (

      <Card className="text-center mb-4 cardbodycolor">

         <Card.Title><h1  className=" text-warning">{this.state.pathway}</h1></Card.Title>
         <Card.Body>

         <Card.Text >{this.state.tasks}</Card.Text>
         </Card.Body>
        

        <Button href={`/pathway/commit/${this.state.pathway}`} className="mt-3 btn-dark btn-outline-warning">Commit to Pathway</Button>

      </Card>

    );
  }
}