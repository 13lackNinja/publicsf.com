import React, { Component } from 'react'
import { database } from './firebase'
import Carousel from './Carousel'
import Marquee from './Marquee'
import FeaturedEvents from './FeaturedEvents'
import NewsletterSignUp from './NewsletterSignUp'
import Grit from './Grit'
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
      image1: '',
      image2: '',
      image3: ''
    }
  }

  componentDidMount() {
    const carouselRef = database.ref('carousel');
    carouselRef.once('value', (snapshot) => {
      const images = snapshot.val();
      this.setState({
        events: [],
        image1: images.image1,
        image2: images.image2,
        image3: images.image3
      });
    });

    const eventsRef = database.ref('events').orderByChild('start').limitToLast(3);
    eventsRef.once('value', (snapshot) => {
      const eventsData = snapshot.val()
      let events = [];

      for (let key in eventsData) {
        eventsData[key].id = key;
        events.push(eventsData[key]);
      }

      this.setState({
        events: events
      });
    });

    const marqueeRef = database.ref('marquee');
    marqueeRef.once('value', (snapshot) => {
      this.setState({
        marqueeText: snapshot.val().text,
        marqueeURL: snapshot.val().url
      });
    });
  }

  render() {
    let images = [
      this.state.image1,
      this.state.image2,
      this.state.image3
    ];

    return (
      <div id="home">
        <Carousel
          images={images}
        />
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
        <Grit />
      </div>
    )
  }
}

export default Home
