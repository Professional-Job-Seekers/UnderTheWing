import React from 'react';
import '../styles/App.css'
import pathwayService from '../services/pathway'
import PathwayTask from '../components/PathwayTask'
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
      <div>
        <h1>{this.state.pathway}</h1>
        {this.state.tasks}
        <a href={`/pathway/commit/${this.state.pathway}`} className="mt-3 btn btn-primary">Commit to Pathway</a>
      </div>
    );
  }
}