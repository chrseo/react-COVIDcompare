import React from "react";
import CountUp from "react-countup";

function GlobalCases(props) {
  return (
    <h3>
      Global Cases:{" "}
      {props.cases == null ? (
        "Loading..."
      ) : (
        <CountUp end={props.cases} separator="," />
      )}
    </h3>
  );
}

export default GlobalCases;
