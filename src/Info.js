import React, { Component } from "react";
import DisplayCountry from "./DisplayCountry";
import GlobalCases from "./GlobalCases";
import styles from "./style.css";

class Info extends Component {
  constructor() {
    super();
    this.state = {
      countryCases: 0,
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
  }

  componentDidMount() {
    fetch("https://coronavirus-19-api.herokuapp.com/countries")
      .then((response) => response.json())
      .then((data) => this.setState({ countries: data }))
      .then(() => this.searchCountry("World"));
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

  submitChange(e) {
    if (e.key === "Enter") {
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
    for (const entry of this.state.countries) {
      let countryName = entry.country;
      if (countryEntered === countryName) {
        // set global cases initially
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

  render() {
    return (
      <div>
        <GlobalCases className="GlobalCases" cases={this.state.globalCases} />

        <div className="searchbar">
          <input
            type="text"
            placeholder="Search by country"
            name="input"
            onKeyUp={this.submitChange.bind(this)}
            onChange={this.handleChange}
            value={this.state.countryName}
          />
        </div>

        {this.state.displayCountry && !this.state.wrongCountry && (
          <DisplayCountry
            className="DisplayCountry"
            country={this.state.countrySubmitted}
            numCases={this.state.countryCases}
            globalNum={this.state.globalCases}
            countryFlags={this.state.countryFlags}
          />
        )}

        {this.state.wrongCountry && (
          <div className="wrongCountry">
            <h3>Country has no data or no country with that name!</h3>
          </div>
        )}

        <p>Created by Chris Seo in quarantine</p>
      </div>
    );
  }
}

export default Info;
