import React, { Component } from 'react'
import { database } from './utility/firebase';
import getEvents from './utility/getEvents';
// import CallToAction from './CallToAction';
import VideoHeader from './VideoHeader';
// import Marquee from './Marquee'
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
      callToActionImageURL: '',
      callToActionTitle: '',
      callToActionURL: '',
      featuredEvents: [],
      marqueeText: '',
      marqueeURL: ''
    }
  }

  componentDidMount() {
    // I: Getting the call to action background image
    database.ref('callToAction').on('value', (snapshot) => {
      this.setState({
        callToActionImageURL: snapshot.val().imageURL,
        callToActionTitle: snapshot.val().title,
        callToActionDate: snapshot.val().date,
        callToActionURL: snapshot.val().clickoutURL
      });
    });

    // II: Getting the last three events for Featured Events
    getEvents()
      .then((events) => {
        this.setState({ featuredEvents: events.slice(0, 3) });
      });

    // III: Getting the marquee text
    database.ref('marquee').on('value', (snapshot) => {
      this.setState({
        marqueeText: snapshot.val().text,
        marqueeURL: snapshot.val().url
      });
    });
  }

  render() {
    return (
      <div id="home">
        <VideoHeader></VideoHeader>
        {/* <Marquee
          text={this.state.marqueeText}
          url={this.state.marqueeURL}
        /> */}
        <AboutStatement />
        <FeaturedEvents events={this.state.featuredEvents} />
        <NewsletterSignUp />
      </div>
    )
  }
}

export default Home
