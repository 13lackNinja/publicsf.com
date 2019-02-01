import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { database } from './utility/firebase';
import getEvents from './utility/getEvents';
import SplashA from './SplashA';
import SplashB from './SplashB';
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
      featuredEvents: [],
      carouselImages: [],
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
        carouselImages: [
          images.image1,
          images.image2,
          images.image3
        ]
      });
    });

    // Getting the last three events for Featured Events
    getEvents()
      .then((events) => {
        this.setState({ featuredEvents: events.slice(0, 3) });
      });

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
        <Route path='/a' component={SplashA}></Route>
        <Route path='/b' component={SplashB}></Route>
        <Marquee
          text={this.state.marqueeText}
          url={this.state.marqueeURL}
        />
        <AboutStatement />
        <FeaturedEvents events={this.state.featuredEvents} />
        <NewsletterSignUp />
      </div>
    )
  }
}

export default Home
