import React from "react";
import CountUp from "react-countup";

function GlobalCases(props) {
  return (
    <div>
      <h3>
        <span role="img" aria-label="globe">
          🌎
        </span>{" "}
        Global Cases |{" "}
        {props.cases == null ? (
          "Loading..."
        ) : (
          <CountUp end={props.cases} duration={1} separator="," />
        )}
      </h3>
    </div>
  );
}

export default GlobalCases;
