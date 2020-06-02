import React, { Component } from "react";
import CountUp from "react-countup";
import "./CountryCard.css";

class CountryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading,
      country: this.props.country,
      countryFlags: this.props.countryFlags,
      countryData: this.props.countryData,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isLoading !== prevState.isLoading) {
      return { isLoading: nextProps.isLoading };
    }
    if (nextProps.country !== prevState.country) {
      return { country: nextProps.country };
    } else return null;
  }

  getEmoji() {
    if (this.state.country === "World") {
      return String.fromCodePoint(0x1f30e);
    }
    // returns character code of country flag emoji
    let countryName = this.state.country.toLowerCase().split(" ").join("-");
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
      <div className="CountryCard">
        <div className="cardHeader">
          <p>
            {this.getEmoji()} {this.state.country}
          </p>
        </div>
        <div className="largeStats">
          <div className="cases">
            <p className="headerNames">Cases</p>
            <p className="headerNumbers">
              {this.state.isLoading ? (
                "—"
              ) : (
                <CountUp
                  end={this.props.countryData.cases}
                  separator=","
                  duration={1}
                />
              )}
            </p>
          </div>

          <span className="largeDivider"></span>

          <div className="deaths">
            <p className="headerNames">Deaths</p>
            <p className="headerNumbers">
              {this.state.isLoading ? (
                "—"
              ) : (
                <CountUp
                  end={this.props.countryData.deaths}
                  separator=","
                  duration={1}
                />
              )}
            </p>
          </div>

          <span className="largeDivider"></span>

          <div className="recovered">
            <p className="headerNames">Recovered</p>
            <p className="headerNumbers">
              {this.state.isLoading ? (
                "—"
              ) : (
                <CountUp
                  end={this.props.countryData.recovered}
                  separator=","
                  duration={1}
                />
              )}
            </p>
          </div>
        </div>
        <div className="smallStats">
          <div className="smallStatsLeft">
            <div className="smallInfoPiece">
              <p className="smallInfoName">Cases per Million</p>{" "}
              <p className="divider">|</p>{" "}
              <p className="smallInfoNumber">
                {this.state.isLoading ? (
                  "—"
                ) : (
                  <CountUp
                    className="smallInfoNumber"
                    end={this.props.countryData.casesPerOneMillion}
                    separator=","
                    duration={1}
                  />
                )}
              </p>
            </div>
            <div className="smallInfoPiece">
              <p className="smallInfoName">Cases Today</p>{" "}
              <p className="divider">|</p>{" "}
              <p className="smallInfoNumber">
                {this.state.isLoading ? (
                  "—"
                ) : (
                  <CountUp
                    className="smallInfoNumber"
                    end={this.props.countryData.todayCases}
                    separator=","
                    duration={1}
                  />
                )}
              </p>
            </div>
            <div className="smallInfoPiece">
              <p className="smallInfoName">Deaths Today</p>{" "}
              <p className="divider">|</p>{" "}
              <p className="smallInfoNumber">
                {this.state.isLoading ? (
                  "—"
                ) : (
                  <CountUp
                    className="smallInfoNumber"
                    end={this.props.countryData.todayDeaths}
                    separator=","
                    duration={1}
                  />
                )}
              </p>
            </div>
          </div>
          <div className="smallStatsRight">
            <div className="smallInfoPiece">
              <p className="smallInfoName">Tests</p>{" "}
              <p className="divider">|</p>{" "}
              <p className="smallInfoNumber">
                {this.state.isLoading ? (
                  "—"
                ) : (
                  <CountUp
                    className="smallInfoNumber"
                    end={this.props.countryData.totalTests}
                    separator=","
                    duration={1}
                  />
                )}
              </p>
            </div>
            <div className="smallInfoPiece">
              <p className="smallInfoName">Active</p>{" "}
              <p className="divider">|</p>{" "}
              <p className="smallInfoNumber">
                {this.state.isLoading ? (
                  "—"
                ) : (
                  <CountUp
                    className="smallInfoNumber"
                    end={this.props.countryData.active}
                    separator=","
                    duration={1}
                  />
                )}
              </p>
            </div>
            <div className="smallInfoPiece">
              <p className="smallInfoName">Critical</p>{" "}
              <p className="divider">|</p>{" "}
              <p className="smallInfoNumber">
                {this.state.isLoading ? (
                  "—"
                ) : (
                  <CountUp
                    className="smallInfoNumber"
                    end={this.props.countryData.critical}
                    separator=","
                    duration={1}
                  />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountryCard;
