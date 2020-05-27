import React from "react";

function DisplayCountry(props) {
  let percent = ((props.numCases / props.globalNum) * 100).toFixed(2);
  return (
    <div>
      <h1>{props.country}</h1>
      <p>
        There are {props.numCases.toLocaleString()} cases in your country.
        That's {percent}% of the cases on Earth!
      </p>
    </div>
  );
}

export default DisplayCountry;
