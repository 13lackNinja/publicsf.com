import React, { Component } from 'react';
import './styles/DeleteButton.css';

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { fill: '#111111' }
  }

  toggleColor(color) {
    this.setState({ fill: color });
  }

  render () {
    return (
      <svg
        width="40"
        height="40"
        className="delete-button"
        version="1.1"
      	viewBox="0 0 774.266 774.266"
        onMouseEnter={() => this.toggleColor('#e75e26')}
        onMouseLeave={() => this.toggleColor('#111111')}
        onClick={this.props.onClick}
      >
      <g>
      	<g>
      		<path
            fill={this.state.fill}
            className="path"
            d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875
      			C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916
      			c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703
      			c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z
      			 M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282
      			c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802
      			H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/>
      		<rect x="475.031" y="286.593" width="48.418" height="396.942" fill={this.state.fill} className="path"/>
      		<rect x="363.361" y="286.593" width="48.418" height="396.942" fill={this.state.fill} className="path"/>
      		<rect x="251.69" y="286.593" width="48.418" height="396.942" fill={this.state.fill} className="path"/>
      	</g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      </svg>
    )
  }
}


;

export default DeleteButton
