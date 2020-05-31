import React from "react";
import Typist from "react-typist";
import "./Header.css";

function Header() {
  return (
    <div className="headerBlock">
      <header>
        <h1 className="header">COVID-19</h1>
        <Typist cursor={{ show: false }}>
          <h2 className="subHeader">How does your country compare?</h2>
        </Typist>
      </header>
    </div>
  );
}

export default Header;
