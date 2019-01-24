import React, {Component} from 'react'

import './styles/Marquee.css'

class Marquee extends Component {
  render() {
    return(
      <a href={this.props.url} target="_blank">
        <div id="marquee">
          <h1 className="marquee-text" id="marquee-text-1">
            {this.props.text}
          </h1>
          <h1 className="marquee-text" id="marquee-text-2">
            {this.props.text}
          </h1>
        </div>
      </a>
    )
  }

  rotate() {
    this.move1();
    window.addEventListener('clear1', this.move2);
    window.addEventListener('clear2', this.move1);
  }

  componentDidMount() {
    this.rotate();
    if (this.props.showAPI) {
      this.getEvents();
    }
  }

  move1() {
    const m1 = document.getElementById('marquee-text-1');
    let pos1 = m1.getBoundingClientRect().left;

    const clear1 = new Event('clear1');

    const timerID = setInterval(() => {
      const textWidth = m1.offsetWidth;
      let rightEdge = m1.getBoundingClientRect().right;
      if (Math.floor(rightEdge) === Math.floor((window.innerWidth / 2))) {
        window.dispatchEvent(clear1);
        pos1 --;
        m1.style.left = `${pos1}px`;
      } else if (pos1 > -textWidth) {
        pos1 --;
        m1.style.left = `${pos1}px`;
      } else {
        clearInterval(timerID);
        m1.style.left = '100vw';
        return;
      }
    }, 8);
  }

  move2() {
    const m2 = document.getElementById('marquee-text-2');
    let pos2 = m2.getBoundingClientRect().left;

    const clear2 = new Event('clear2');

    const timerID = setInterval(() => {
      const textWidth = m2.offsetWidth;
      let rightEdge = m2.getBoundingClientRect().right;
      if (Math.floor(rightEdge) === Math.floor((window.innerWidth / 2))) {
        window.dispatchEvent(clear2);
        pos2 --;
        m2.style.left = `${pos2}px`;
      } else if (pos2 > -textWidth) {
        pos2--;
        m2.style.left = `${pos2}px`;
      } else {
        clearInterval(timerID);
        m2.style.left = '100vw';
        return;
      }
    }, 8);
  }

}

export default Marquee
