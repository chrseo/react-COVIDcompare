import React, { Component } from "react";
import Header from "./Header";
import HomeBody from "./HomeBody";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <HomeBody />
      </div>
    );
  }
}

export default Home;
