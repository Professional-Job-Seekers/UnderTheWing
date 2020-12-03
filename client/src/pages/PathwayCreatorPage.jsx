/*Styles*/
import '../styles/App.css'
/*Components*/
import PathwayCreationForm from '../components/forms/PathwayCreationForm';
import React from 'react';
export default class PathwayCreatorPage extends React.Component {
  render(){
    return (
        <PathwayCreationForm/>
    );
  }
}