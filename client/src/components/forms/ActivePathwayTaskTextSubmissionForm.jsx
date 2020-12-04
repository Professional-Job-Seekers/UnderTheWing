/*Styles*/
/*Services*/
import activePathwayService from '../../services/activePathway'
/*Components*/
import React from "react";
import { Redirect } from 'react-router-dom';

export default class ActivePathwayTaskTextSubmissionForm extends React.Component {

  state = {
    "submission": "",
    "flash": ""
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { submission } = this.state;
      const submissionResponse = await activePathwayService.updateActivePathwayTaskProgress(this.props.activeTaskId, submission);
      this.setState({
        "flash": "Success!",
      });   
      setTimeout(()=> window.location.replace("/userdash"), 2000);
    } catch (err) {
      this.setState({
        "flash": "Failure!",
      }); 
      console.log(err);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label
            for="task-text-submission"
            name="submission"
          >
            <strong>Text Submission:</strong>
            <p>
              <strong>{this.state.flash}</strong>
            </p>
          </label>
          <textarea
            onChange={this.handleChange}
            class="form-control"
            name="submission"
            id="task-text-submission"
            rows="3"
            value={this.state.submission}
          />
        </div>
        <button className="btn btn-primary" type="submit"> Submit </button>
      </form>
    );
  }
}