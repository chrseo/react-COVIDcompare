import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import "./Searchbar.css";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderText: this.props.placeholderText,
      submitChange: this.props.submitChange,
      handleChange: this.props.handleChange,
      handleClick: this.props.handleClick,
      countryName: this.props.countryName,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.countryName !== prevState.countryName) {
      return { countryName: nextProps.countryName };
    } else return null;
  }

  render() {
    return (
      <div className="componentSearchbar">
        <input
          className="searchbarStyle"
          type="text"
          placeholder={this.state.placeholderText}
          onKeyUp={this.state.submitChange}
          onChange={this.state.handleChange}
          value={this.state.countryName}
        />
        <button
          className="searchButton"
          onClick={this.state.handleClick}
          name="button"
        >
          <MaterialIcon icon="search" size={27} color="#E3E3E3" />
        </button>
      </div>
    );
  }
}

export default Searchbar;
