import React, { Component } from 'react'
import { database } from './firebase';
import getEvents from './utility/getEvents';
import Carousel from './Carousel'
import Marquee from './Marquee'
import FeaturedEvents from './FeaturedEvents'
import NewsletterSignUp from './NewsletterSignUp'
import TypeLogo from './TypeLogo'

import './styles/Home.css'

import manholeImage from './images/pw_manhole_white.png'

const AboutStatement = () => (
  <div id="about-statement">
    <TypeLogo type="about" />
    <p>
      Located in the heart of San Francisco's Mission District, Public Works is a community-minded nightclub and event space dedicated to "Giving the People What They Want." With a Funktion-One sound system and a clean, utilitarian aesthetic, Public Works is a blank canvas of creativity that welcomes international DJs, underground artists, rising talent, and the myriad of arts and music communities that call San Francisco Home.
    </p>
    <img src={manholeImage} alt="pw_manhole_white.png"/>
  </div>
)

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      images: [],
      marqueeText: '',
      marqueeURL: ''
    }
  }

  componentDidMount() {
    const marqueeRef = database.ref('marquee');

    // Getting the carousel images
    database.ref('carousel').on('value', (snapshot) => {
      const images = snapshot.val();

      this.setState({
        images: [
          images.image1,
          images.image2,
          images.image3
        ]
      });
    });

    // Getting the last three events for Featured Events
    getEvents()
      .then((events) => {
        return events.slice(0, 3);
      })
      .then(nextEvents => this.setState({ events: nextEvents }));

    // Getting the marquee text
    marqueeRef.on('value', (snapshot) => {
      this.setState({
        marqueeText: snapshot.val().text,
        marqueeURL: snapshot.val().url
      });
    });
  }

  render() {
    return (
      <div id="home">
        <Carousel images={this.state.images}/>
        <Marquee
          text={this.state.marqueeText}
          url={this.state.marqueeURL}
        />
        <AboutStatement />
        <FeaturedEvents events={
          this.state.events[0] ?
            this.state.events : null
        }/>
        <NewsletterSignUp />
      </div>
    )
  }
}

export default Home
