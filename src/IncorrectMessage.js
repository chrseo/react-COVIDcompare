import React, { Component } from "react";
import "./IncorrectMessage.css";

class IncorrectMessage extends Component {
  // temporary message that fades
  render() {
    return <p className="errorMessage">Not a real country or has no data!</p>;
  }
}

export default IncorrectMessage;
