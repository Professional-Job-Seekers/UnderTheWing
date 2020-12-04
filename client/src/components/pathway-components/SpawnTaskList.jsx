import React from "react";
import PathwayTask from "./PathwayTask"

export default class SpawnTaskList extends React.Component {
    constructor(props) {
        super(props);
        this.generateSpawnTaskList = this.generateSpawnTaskList.bind(this);
    }
    generateSpawnTaskList(spawnTaskListData){
        const spawnTaskListRender = spawnTaskListData.map((task) =>{
            console.log(task);
            return <PathwayTask taskDescription = {task.description} taskTitle = {task.title} />;
        });
        return spawnTaskListRender;
    }
    render(){
        return ( 
            <div>
                {this.generateSpawnTaskList(this.props.spawnTaskListData)}
            </div>   
        )
    }
}