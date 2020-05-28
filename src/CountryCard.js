import React, { Component } from "react";

class CountryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.country,
      countryFlags: this.props.countryFlags,
      countryData: this.props.countryData,
      isGlobal: this.props.country === "World",
    };
  }

  componentDidMount() {}

  getEmoji() {
    if (this.state.isGlobal) {
      return String.fromCodePoint(0x1f30e);
    }
    // returns character code of country flag emoji
    let countryName = this.state.countryData.country
      .toLowerCase()
      .split(" ")
      .join("-");
    switch (countryName) {
      case "usa":
        countryName = "united-states";
        break;
      case "s.-korea":
        countryName = "south-korea";
        break;
      case "uk":
        countryName = "england";
        break;
      default:
        break;
    }
    countryName = "flag-" + countryName;
    for (const country of this.state.countryFlags) {
      if (country.slug === countryName) {
        return country.character;
      }
    }
    return "";
  }

  render() {
    return (
      <div className="Card">
        <div className="cardHeader">
          <h2>
            {this.getEmoji()} {this.state.country}
          </h2>
        </div>
        <div className="largeStats">
          <p>Cases: {this.state.countryData.cases.toLocaleString()}</p>
        </div>
        <div className="smallStats"></div>
      </div>
    );
  }
}

export default CountryCard;
