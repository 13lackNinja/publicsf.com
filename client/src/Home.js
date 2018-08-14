import React from 'react'
import Carousel from './Carousel.js'
import Marquee from './Marquee.js'
import FeaturedEvents from './FeaturedEvents.js'
import NewsletterSignUp from './NewsletterSignUp.js'
import Grit from './Grit.js'
import TypeLogo from './TypeLogo.js'

import './styles/Home.css'

import manholeImage from './images/pw_manhole.png'
import pwhomeImage from './images/pwhome.jpg'
import jointheranksImage from './images/jointheranks.jpg'
import scan20 from './images/scan20.jpg'

const AboutStatement = () => (
  <div id="about-statement">
    <TypeLogo type="about" />
    <p>
      Located in the heart of San Francisco's Mission District, Public Works is a community-minded nightclub and event space dedicated to "Giving the People What They Want." With a Funktion One sound system and a clean, utilitarian aesthetic, Public Works is a blank canvas of creativity that welcomes international DJs, underground artists, rising talent, and the myrad arts and music communities that call San Francisco Home.
    </p>
    <img src={manholeImage} alt="pw_manhole.png"/>
  </div>
)

const Home = () => (
  <div id="home">
    <Carousel
      images={[
        jointheranksImage,
        scan20,
        pwhomeImage
      ]}
    />
    <Marquee text={`Just Announced: `} showAPI={true}/>
    <AboutStatement />
    <FeaturedEvents />
    <NewsletterSignUp />
    <Grit />
  </div>
)

export default Home
