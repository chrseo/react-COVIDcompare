import React, { Component } from "react";
import CountryCard from "./CountryCard";

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <div>
          <CountryCard
            country="World"
            countryFlags={this.state.countryFlags}
            countryData={this.state.worldData}
          />
        </div>

        <div>
          <CountryCard
            country={this.state.countryData.country}
            countryFlags={this.state.countryFlags}
            countryData={this.state.countryData}
          />
        </div>
      </div>
    );
  }
}

export default InfoPage;
