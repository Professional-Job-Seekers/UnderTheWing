import React from "react";
import "../styles/App.css";
import {Tabs, Tab} from "react-bootstrap";
import Card from "../Cards/ObjectiveCards";
import PathwayTask from "./PathwayTask";
export default class PathwayObjectives extends React.Component{    
  state = {
    activePathwayRenderArray: [],

  }
  /* Fetch Data Here */
  async componentDidMount() {
    const activePathwayComponents = this.props.activePathwayData.map(pathway => (
     // <Tab title={pathway.pathway}>
       pathway.tasks.map(task => <PathwayTask taskTitle = {task.title}/>)
     // </Tab>   
    ));
    this.setState({
      "activePathwayRenderArray": activePathwayComponents,
    });
  }

  render(){
    return (
      <div>
           {this.state.activePathwayRenderArray}
      </div>
    );
  }
}

