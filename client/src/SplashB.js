import React from 'react';
import { database } from './utility/firebase';

import './styles/Splash.css';

import splashImage from './images/splash.jpg';

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
