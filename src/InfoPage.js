import React, { Component } from "react";
import CountryCard from "./CountryCard.js";
import IncorrectMessage from "./IncorrectMessage.js";
import Searchbar from "./Searchbar.js";
import { Redirect } from "react-router-dom";
import HomeBody from "./HomeBody.js";

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
    this.handleChange = this.handleChange.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.displayCountry !== prevState.displayCountry) {
      return { displayCountry: nextProps.displayCountry };
    } else return null;
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ countryName: value });
  }

  submitChange(event) {
    if (event.key === "Enter") {
      this.searchCountry(this.state.countryName);
    }
  }

  searchCountry(countryEntered) {
    countryEntered = HomeBody.toValidCountry(countryEntered);
    if (countryEntered === "") {
      return;
    }
    for (const countryData of this.state.allCountryData) {
      let countryName = countryData.country;
      if (countryEntered === countryName) {
        this.setState({
          displayCountry: true,
          countryData: countryData,
          wrongCountry: false,
        });
        return;
      }
    }
    this.setState({
      wrongCountry: true,
    });
  }

  render() {
    return (
      <div>
        <Searchbar
          placeholderText="Search another country"
          submitChange={this.submitChange}
          handleChange={this.handleChange}
          countryName={this.state.countryName}
        />

        {this.state.displayCountry && (
          <Redirect
            to={{
              pathname: `/${this.state.countryName}`,
              state: {
                countryName: this.state.countryName,
                displayCountry: false,
                wrongCountry: false,
                allCountryData: this.state.allCountryData,
                countryData: this.state.countryData,
                countryFlags: this.state.countryFlags,
                worldData: this.state.worldData,
              },
            }}
          />
        )}

        {this.state.wrongCountry && <IncorrectMessage />}

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
