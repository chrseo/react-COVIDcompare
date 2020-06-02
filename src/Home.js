import React, { Component } from "react";
import Header from "./Header";
import HomeBody from "./HomeBody";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="notFooter">
          <Header />
          <HomeBody />
        </div>
        <div className="gradient"></div>
        <div className="footerBar">
          <p>Created by Chris Seo in quarantine</p>
        </div>
      </div>
    );
  }
}

export default Home;
