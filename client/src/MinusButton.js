import React, { Component } from 'react';

import './styles/MinusButton.css';

class MinusButton extends Component {
  constructor(props) {
    super(props);
    this.state = { fill: "#111111" }
  }

  toggleColor(color) {
    this.setState({ fill: color });
  }

  render() {
    return (
      <svg
        className="minus-button"
        x="0px" y="0px"
      	viewBox="0 0 42 42"
        onMouseEnter={() => this.toggleColor("#e75e26")}
        onMouseLeave={() => this.toggleColor("#111111")}
        onClick={this.props.onClick}
      >
        <rect
          className="minus-button-fill"
          x="4" y="19" width="34" height="2"
          style={{ "fill": `${this.state.fill}` }}
        />
      </svg>
    );
  }
}

export default MinusButton;
