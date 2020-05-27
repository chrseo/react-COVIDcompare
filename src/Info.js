import React, { Component } from "react";
import DisplayCountry from "./DisplayCountry";

class Info extends Component {
  constructor() {
    super();
    this.state = {
      countryCases: 0,
      globalCases: "Loading...",
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
    for (let i = 0; i < this.state.countries.length; i++) {
      let entry = this.state.countries[i];
      let countryName = entry.country;
      if (countryEntered === countryName) {
        if (countryEntered === "World") {
          let cases = entry.cases;
          this.setState({ globalCases: cases });
          break;
        }
        let cases = entry.cases;
        this.setState({ countryCases: cases });
        this.setState({ displayCountry: true });
        this.setState({ countrySubmitted: countryName });
        this.setState({ wrongCountry: false });
        break;
      } else {
        this.setState({ wrongCountry: true });
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Global Cases: {this.state.globalCases}</h2>

        <br />

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
          <h2>There is no country with that name!</h2>
        )}
      </div>
    );
  }
}

export default Info;