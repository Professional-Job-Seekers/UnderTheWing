import React from 'react';
import '../styles/App.css'
import '../components/forms/PathwayCreationForm'
import pathwayService from '../services/pathway'
import PathwayCreationForm from '../components/forms/PathwayCreationForm';
export default class PathwayCreatorPage extends React.Component {
  state = {
    success: false,
    successMsg: "",
    failureMsg:""    
  }
  async componentDidMount(){
  }
  render(){
    return (
        <PathwayCreationForm/>
    );
  }
}