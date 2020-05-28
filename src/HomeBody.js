import React, { Component } from "react";
import DisplayCountry from "./DisplayCountry.js";
import CountryCard from "./CountryCard.js";
import IncorrectMessage from "./IncorrectMessage.js";
import BrowserRouter, { Redirect } from "react-router-dom";
import styles from "./style.css";

class HomeBody extends Component {
  constructor() {
    super();
    this.state = {
      countryCases: 0,
      allCountryData: null,
      globalCases: null,
      countryName: "",
      countrySubmitted: "",
      countries: {},
      countryFlags: {},
      displayCountry: false,
      wrongCountry: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  componentDidMount() {
    fetch("https://coronavirus-19-api.herokuapp.com/countries")
      .then((response) => response.json())
      .then((data) => this.setState({ allCountryData: data }));

    console.log(this.state.allCountryData);
    fetch(
      "https://emoji-api.com/categories/flags?access_key=cb966f1d846d4a6c32bfb8363962b07dada1668b"
    )
      .then((response) => response.json())
      .then((data) => this.setState({ countryFlags: data }));
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

  toValidCountry(countryEntered) {
    //handles different capitalization in entries
    countryEntered = countryEntered
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ")
      .trim();
    //handles different cases for USA
    const USAinput = ["United States", "Us", "Usa"];
    if (USAinput.includes(countryEntered)) {
      return "USA";
    }
    //handles different cases for UK
    const UKinput = ["United Kingdom", "Uk", "England"];
    if (UKinput.includes(countryEntered)) {
      return "UK";
    }
    //handles different cases for South Korea
    if (countryEntered === "South Korea") {
      return "S. Korea";
    }
    return countryEntered;
  }

  searchCountry(countryEntered) {
    countryEntered = this.toValidCountry(countryEntered);
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

  getWorldData() {
    if (this.state.allCountryData) {
      for (const countryData of this.state.allCountryData) {
        let countryName = countryData.country;
        if (countryName === "World") {
          return countryData;
        }
      }
    }
    return null;
  }

  render() {
    return (
      <div>
        <CountryCard
          country="World"
          countryFlags={this.state.countryFlags}
          countryData={this.getWorldData()}
        />

        <div className="searchbar">
          <input
            type="text"
            placeholder="Search by country"
            name="input"
            onKeyUp={this.submitChange}
            onChange={this.handleChange}
            value={this.state.countryName}
          />
        </div>

        {this.state.displayCountry && !this.state.wrongCountry && (
          <Redirect
            to={{
              pathname: `/${this.state.countryName}`,
              state: {
                countryData: this.state.countryData,
                countryFlags: this.state.countryFlags,
                worldData: this.getWorldData(),
              },
            }}
          />
        )}

        {this.state.wrongCountry && <IncorrectMessage />}

        <p>Created by Chris Seo in quarantine</p>
      </div>
    );
  }
}

export default HomeBody;
