import React, { Component } from "react";
import DisplayCountry from "./DisplayCountry";
import GlobalCases from "./GlobalCases";

class Info extends Component {
  constructor() {
    super();
    this.state = {
      countryCases: 0,
      globalCases: null,
      countryName: "",
      countrySubmitted: "",
      countries: {},
      displayCountry: false,
      wrongCountry: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
  }

  componentDidMount() {
    fetch("https://coronavirus-19-api.herokuapp.com/countries")
      .then((response) => response.json())
      .then((data) => this.setState({ countries: data }))
      .then(() => this.searchCountry("World"));
  }

  handleChange(event) {
    const { name, value } = event.target;
    name === "input"
      ? this.setState({ countryName: value })
      : this.searchCountry(value);
  }

  searchCountry(countryEntered) {
    //handles different capitalization in entries
    countryEntered = countryEntered
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    //handles different cases for USA
    if (
      countryEntered === "United States" ||
      countryEntered === "Us" ||
      countryEntered === "Usa"
    ) {
      countryEntered = "USA";
    }

    //handles different cases for South Korea
    if (countryEntered === "South Korea") {
      countryEntered = "S. Korea";
    }
    for (let i = 0; i < this.state.countries.length; i++) {
      let entry = this.state.countries[i];
      let countryName = entry.country;
      if (countryEntered === countryName) {
        // global cases
        if (countryEntered === "World") {
          let cases = entry.cases;
          this.setState({ globalCases: cases });
          break;
        }
        let cases = entry.cases;
        this.setState({
          countryCases: cases,
          displayCountry: true,
          countrySubmitted: countryName,
          wrongCountry: false,
        });
        break;
      } else {
        this.setState({ wrongCountry: true });
      }
    }
  }

  //<h2>Global Cases: {this.state.globalCases.toLocaleString()}</h2>

  render() {
    return (
      <div>
        <GlobalCases cases={this.state.globalCases} />

        <input
          type="text"
          placeholder="Enter country name"
          name="input"
          onChange={this.handleChange}
          value={this.state.countryName}
        />

        <button
          type="text"
          onClick={this.handleChange}
          name="button"
          value={this.state.countryName}
        >
          Go!
        </button>

        <br />

        {this.state.displayCountry && !this.state.wrongCountry && (
          <DisplayCountry
            country={this.state.countrySubmitted}
            numCases={this.state.countryCases}
            globalNum={this.state.globalCases}
          />
        )}

        {this.state.wrongCountry && (
          <h3>
            There is no country with that name or there is no data on that
            country!
          </h3>
        )}
      </div>
    );
  }
}

export default Info;
