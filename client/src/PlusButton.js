import React, { Component } from 'react';

import './styles/PlusButton.css';

class PlusButton extends Component {
  constructor(props) {
    super(props);
    this.state = { fill: '#111111' };
  }

  toggleColor(color) {
    this.setState({ fill: color });
  }

  render() {
    return (
      <svg
        className='plus-button'
        x="0px"
        y="0px"
      	viewBox="0 0 60 60"
        onMouseOver={() => this.toggleColor('#e75e26')}
        onMouseLeave={() => this.toggleColor('#111111')}
        onClick={this.props.onClick}
      >
        <g>
        	<polygon
            style={{ "fill": `${this.state.fill}`}}
            className="plus-button-path"
            points="29,51 31,51 31,31 51,31 51,29 31,29 31,9 29,9 29,29 9,29 9,31 29,31 	"/>
        </g>
      </svg>
    )
  }
}

export default PlusButton
