import React, { Component } from "react";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import MentorPageCard from "../Cards/MentorPageCard";
import "../styles/MentorCard.css";

export default class MentorPage extends Component {
  render() {
    return (
      <section id="team">
        <MentorPageCard />
      </section>
    );
  }
}
