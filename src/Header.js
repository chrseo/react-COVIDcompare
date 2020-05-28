import React from "react";
import Typist from "react-typist";

function Header() {
  return (
    <div className="header">
      <header>
        <h1>COVID-19</h1>
        <Typist cursor={{ show: false }}>
          <h2>How does your country compare?</h2>
        </Typist>
      </header>
    </div>
  );
}

export default Header;
