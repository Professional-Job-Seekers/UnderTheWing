import React from 'react';
import '../styles/App.css'
import '../components/forms/PathwayCreationForm'
import PathwayCreationForm from '../components/forms/PathwayCreationForm';
export default class PathwayCreatorPage extends React.Component {
  render(){
    return (
        <PathwayCreationForm/>
    );
  }
}