/*Styles*/
/*Services*/
import { getCookie } from '../../services/cookies'
import activePathwayService from '../../services/activePathway'
/*Components*/
import React from "react";
import { Redirect } from 'react-router-dom';

export default class ActivePathwayTaskTextSubmissionForm extends React.Component {

  state = {};

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (

      <form>
        <div class="form-group">
          <label for="task-text-submission">Example textarea</label>
          <textarea class="form-control" id="task-text-submission" rows="3"></textarea>
        </div>
        <button className="btn btn-primary" type="submit"> Submit </button>
      </form>
    );
  }
}