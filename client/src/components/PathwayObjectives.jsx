import React from "react";
import "../styles/App.css";
import {Tabs, Tab} from "react-bootstrap";
import Card from "../Cards/ObjectiveCards";
import PathwayTask from "./PathwayTask";
export default class PathwayObjectives extends React.Component{    
  render(){
    const activePathwayComponents = this.props.activePathwayData.map((pathway, index) => (
      <Tab  eventKey={pathway.pathway} title={pathway.pathway} key ={index}>
        {pathway.tasks.map((task, index) => <PathwayTask key ={index} taskTitle = {task.title} taskStatus = {task.status} />)}
      </Tab>   
    ));
    return (
      <div>
        <Tabs fill>
            {activePathwayComponents}
        </Tabs>
      </div>
    );
  }
}

