import React from "react";

function DisplayCountry(props) {
  let percent = ((props.numCases / props.globalNum) * 100).toFixed(2);

  function getEmoji() {
    let countryFlagName = props.country.toLowerCase().split(" ").join("-");
    switch (countryFlagName) {
      case "usa":
        countryFlagName = "united-states";
        break;
      case "s.-korea":
        countryFlagName = "south-korea";
        break;
      case "uk":
        countryFlagName = "england";
        break;
      default:
        break;
    }
    countryFlagName = "flag-" + countryFlagName;
    for (const country of props.countryFlags) {
      if (country.slug === countryFlagName) {
        return country.character + " ";
      }
    }
    return "";
  }

  return (
    <div>
      <h1>
        {getEmoji()}
        {props.country}
      </h1>
      <p>
        There are {props.numCases.toLocaleString()} cases in your country.
        That's {percent}% of the cases in the world!
      </p>
    </div>
  );
}

export default DisplayCountry;
