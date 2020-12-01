import React from "react";
import { Card, Button } from "react-bootstrap";

export default class Pathway extends React.Component {
  render() {
    return (
      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title>{this.props.pathwayTitle}</Card.Title>

          <Card.Text>
            {this.props.pathwayDescription || "No Description Available"}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            className="mt-3"
            href={`${this.props.baseURL}/pathway-detail/${this.props.pathwayTitle}`}
          >
            Learn More
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}

// add to buttons submit to take you to a new pg with text box
// with infor below like task name and status

// new status contains taskStatus properties
/*
"completed": "Completed",
    "skipped": "Skipped",
    "under_review": 'Under Review', 
    "pending_start" : 'Pending Start', 
    "pending_review": 'Pending Review', 
    "in_progress": 'In Progress',

*/
//use to make a request to this endpoint
//POST : pathways/progress/update
// which is already setup in updatePathwayTaskProgress method

//  pathway.updatePathwayTaskProgress(pathway.taskStatus.completed)

// then make a card that shows stats on current pg
// edit Pathway.jsx file
