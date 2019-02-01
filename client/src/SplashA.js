import React from 'react';
import { database } from './utility/firebase';

import './styles/Splash.css';

import splashImage from './images/scan22.jpg';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      imageURL: '',
      clickoutURL: 'https://eventbrite.com'
    }
  }

  render() {
    return(
      <a href={this.state.clickoutURL}>
        <div id="splash" style={{backgroundImage: `url(${splashImage})`}}>
          <div id="text">
            <h2>{this.state.date}</h2>
            <h1>{this.state.text}</h1>
          </div>
        </div>
      </a>
    )
  }

  componentDidMount() {
    database
      .ref('splash')
      .on('value', (snapshot) => {
        this.setState({
          text: snapshot.val().text,
          date: snapshot.val().date,
          imageURL: snapshot.val().imageURL,

        });
      });
  }
}

export default Splash;
