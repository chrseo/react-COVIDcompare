import React, { Component } from "react";
import CountryCard from "./CountryCard.js";
import IncorrectMessage from "./IncorrectMessage.js";
import Searchbar from "./Searchbar.js";
import { Redirect } from "react-router-dom";
import HomeBody from "./HomeBody.js";
import "./InfoPage.css";

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
    this.handleChange = this.handleChange.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.submitChange = this.submitChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(event) {
    this.searchCountry(this.state.countryName);
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
    //ability to rerender error message
    setTimeout(() => {
      this.setState({
        wrongCountry: false,
      });
    }, 1300);
  }

  render() {
    return (
      <div>
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

        <div className="rightSide">
          <div className="infoPageSearch">
            <Searchbar
              placeholderText="Search another country"
              submitChange={this.submitChange}
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              countryName={this.state.countryName}
            />
            {this.state.wrongCountry && (
              <div className="errorMessage">
                <IncorrectMessage />
              </div>
            )}
          </div>
        </div>

        <div className="leftSide">
          <div className="topCard">
            <CountryCard
              country="World"
              countryFlags={this.state.countryFlags}
              countryData={this.state.worldData}
            />
          </div>

          <div className="bottomCard">
            <CountryCard
              country={this.state.countryData.country}
              countryFlags={this.state.countryFlags}
              countryData={this.state.countryData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPage;
