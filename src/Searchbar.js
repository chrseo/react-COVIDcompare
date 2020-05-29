import React, { Component } from "react";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderText: this.props.placeholderText,
      submitChange: this.props.submitChange,
      handleChange: this.props.handleChange,
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
      <div className="Searchbar">
        <input
          type="text"
          placeholder={this.state.placeholderText}
          onKeyUp={this.state.submitChange}
          onChange={this.state.handleChange}
          value={this.state.countryName}
        />
      </div>
    );
  }
}

export default Searchbar;
