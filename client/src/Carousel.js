import React, { Component } from 'react'

import './styles/Carousel.css'

const Slide = (props) => (
  <div
    id="image-container"
    style={{ backgroundImage: `url(${props.image})` }}
  >
  </div>
)

class Circle extends Component {
  constructor(props) {
    super(props);
    this.on = '#ededed';
    this.off = '#111111';
  }

  render() {
    return (
      <svg className="circle-svg" onClick={this.props.onClick}>
        <circle
          fill={
            this.props.index === this.props.position ?
            this.on : this.off
          }>
        </circle>
      </svg>
    );
  }
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this);
    this.state = { position: 1 };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.rotate(), 32000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  rotate() {
    const imageContainer = document.getElementById('image-container');
    let position = this.state.position;

    if (position === 3) {
      position = 1;
    } else {
      position ++;
    }

    imageContainer.style.opacity = '0';

    setTimeout(
      () => {
        imageContainer.style.opacity = '1';
        this.setState({ position: position });
      }, 3000
    );

  }

  jump(index) {
    this.setState({ position: index });
  }

  render() {
    return (
      <div id="carousel-container">
      <Slide image={this.props.images[this.state.position - 1]} />
        <div id="circle-container">
          <Circle index={1} position={this.state.position} onClick={() => this.jump(1)}/>
          <Circle index={2} position={this.state.position} onClick={() => this.jump(2)}/>
          <Circle index={3} position={this.state.position} onClick={() => this.jump(3)}/>
        </div>
      </div>
    )
  }
}

export default Carousel
