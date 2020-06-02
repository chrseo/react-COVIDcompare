import React, { Component } from "react";
import CountryCard from "./CountryCard.js";
import IncorrectMessage from "./IncorrectMessage.js";
import Searchbar from "./Searchbar.js";
import { Redirect } from "react-router-dom";

class HomeBody extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      worldData: null,
      countryData: null,
      allCountryData: null,
      globalCases: null,
      countryName: "",
      countryFlags: {},
      displayCountry: false,
      wrongCountry: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.submitChange = this.submitChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("https://coronavirus-19-api.herokuapp.com/countries")
      .then((response) => response.json())
      .then((data) => this.setState({ allCountryData: data }))
      .then(() => this.setState({ worldData: this.getWorldData() }))
      .then(() => this.setState({ isLoading: false }));

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

  handleClick(event) {
    this.searchCountry(this.state.countryName);
  }

  static toValidCountry(countryEntered) {
    //handles different capitalization in entries
    countryEntered = countryEntered
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ")
      .trim();
    //rejects a "world" entry
    if (countryEntered === "World") {
      return "notCountry";
    }
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

    //to rerender error message if re-entered a wrong country
    setTimeout(() => {
      this.setState({
        wrongCountry: false,
      });
    }, 1300);
  }

  getWorldData() {
    let worldTotalTests = 0;
    let worldData;
    for (const countryData of this.state.allCountryData) {
      let countryName = countryData.country;
      if (countryName === "World") {
        worldData = countryData;
      }
      worldTotalTests += countryData.totalTests;
    }
    worldData.totalTests = worldTotalTests;
    return worldData;
  }

  render() {
    const errorStyle = {
      display: "inline-block",
      bottom: "10px",
      marginTop: "1.3vh",
      marginBottom: "1.8vh",
    };
    const searchStyle = {
      marginBottom: "1.5vh",
    };
    return (
      <div>
        <div style={searchStyle}>
          <Searchbar
            placeholderText="Search by country"
            submitChange={this.submitChange}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            countryName={this.state.countryName}
          />
          {this.state.wrongCountry && (
            <div style={errorStyle}>
              <IncorrectMessage />
            </div>
          )}
        </div>

        <CountryCard
          isLoading={this.state.isLoading}
          country="World"
          countryData={this.state.worldData}
          countryFlags={this.state.countryFlags}
        />

        {this.state.displayCountry && (
          <Redirect
            to={{
              pathname: `/${this.state.countryName}`,
              state: {
                countryName: "",
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
      </div>
    );
  }
}

export default HomeBody;
