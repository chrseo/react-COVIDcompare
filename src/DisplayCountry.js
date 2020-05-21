import React from "react";

function DisplayCountry(props) {
  let percent = Math.floor((props.numCases / props.globalNum) * 100);
  console.log(percent);
  return (
    <div>
      <h1>{props.country}</h1>
      <p>
        There are {props.numCases} in your country. That's {percent}% of the
        cases on Earth!
      </p>
    </div>
  );
}

export default DisplayCountry;
