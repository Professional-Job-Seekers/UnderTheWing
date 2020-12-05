import React, { Component } from "react";
import SpawnTaskList from "../pathway-components/SpawnTaskList";
import { Redirect } from 'react-router-dom';;

export default class PathwayCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      tasks: [],
      taskTitle: "",
      taskError: "",
      taskSequence: 0,
      taskRequiresReview: false,
      taskDescription: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }

  updateTaskList(event) {
    event.preventDefault();
    const { taskTitle, taskSequence, taskRequiresReview, taskDescription } = this.state;
    if (!(taskTitle)) {
      this.setState({
        "taskError": "Missing Fields!"
      });
      return;
    }
    const newTask = {
      "title": taskTitle,
      "sequence": taskSequence,
      "requires_review": taskRequiresReview,
      "description": taskDescription
    };
    this.setState({
      tasks: [...this.state.tasks, newTask],
      "taskError": ""
    });
    console.log(this.state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { title, category, tasks } = this.state;
    const creationRequestJSON = {
      "title": title,
      "categories": category,
      "tasks": tasks
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creationRequestJSON)
    };
    try {
      const response = await fetch('api/pathways/create', requestOptions);
      setTimeout(()=> window.location.replace("/pathway"), 1000);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div class="custom-form-wrapper container justify-content-center">
        <div class="row align-items-center">
          <div class="col-12">
            <h1> Welcome to the Pathway Creator </h1>
            {/* Pathway */}
            <form className="custom-form" onSubmit={this.handleSubmit}>
              <div class="form-group">
                <input className="form-control" type="text" name="title" placeholder="Pathway Title" value={this.state.title} onChange={this.handleChange} required />
              </div>
              <div classname="form-group">
                <fieldset>
                  <legend>Category:</legend>
                  <p>
                    <select name="category" value={this.state.category} onChange={this.handleChange}>
                      <option value="mentors"> Mentors</option>
                      <option value="mentees"> Mentees</option>
                    </select>
                  </p>
                </fieldset>
              </div>
              <br></br>
              <button className="btn btn-primary mr-2" onClick={this.updateTaskList} type="button"> Add Task </button>
              <button className="btn btn-primary" type="submit"> Submit </button>
            </form>
            {/* Tasks */}
            <form className="custom-form">
              <h2 className="mt-3"> Task </h2>
              <p> {this.state.taskError || ""}</p>
              <div class="form-group">
                <input className="form-control" type="text" name="taskTitle" placeholder="Task Title" onChange={this.handleChange} required />
              </div>
              <div class="form-group">
                <input 
                  className="form-control"
                  type="text" 
                  name="taskDescription"
                  placeholder="Task Description"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <input className="form-control" min="0" type="number" name="taskSequence" placeholder="Task Sequence" value={this.state.tasks.length} onChange={this.handleChange} required />
              </div>
              <div class="form-group">
                <fieldset>
                  <legend> Does Task Require Review?:</legend>
                  <p>
                    <select required value={this.state.taskRequiresReview} onChange={this.handleChange}>
                      <option value="true"> Yes</option>
                      <option value="false"> No</option>
                    </select>
                  </p>
                </fieldset>
              </div>
            </form>
            <SpawnTaskList spawnTaskListData={this.state.tasks} />
          </div>
        </div>
      </div>
    );
  }
}


