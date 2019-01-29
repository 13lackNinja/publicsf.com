// Content for the Private Events page.

import React from 'react'
import HeroImage from './HeroImage'
import ContactForm from './ContactForm.js'
import NewsletterSignUp from './NewsletterSignUp.js'

import './styles/PrivateEvents.css'

import loftImage from './images/loft.jpg'
import corporateImage1 from './images/corporate1_dark.jpg'
import outsideImage from './images/outside.jpg'
import pwmanholeImage from './images/pw_manhole_white.png'

const PrivateEventsInfo = () => (
  <div id="private-events-info">
    <h2>Take the 'office' out of your office party</h2>
    <p>
      Public Works has hosted corporate events, galas, birthdays, team outings, film screenings, holiday parties, seminars, retreats and more ranging from 15 to 1200 people. You can rent one room or the entire venue, and our dedicated in-house support team will work with you to create an event your attendees will never forget.
    </p>
    <div
      className="private-events-image"
      style={{ 'background-image': `url(${outsideImage})`}}
    >
    </div>
    <h2>Our venue Features</h2>
    <ul>
      <div>
        <li>
          Professional and experienced event staff
        </li>
        <li>
          Top of the line A/V including our world-class Funktion One sound system
        </li>
        <li>
          Multiple bars with skilled mixologists at your disposal (plenty of non-alcoholic options available)
        </li>
        <li>
          Vibrant interior design featuring artisan-made furniture and modern artwork by local artists
        </li>
      </div>
      <div>
        <li>
          Proven, diverse network of caterers, from gourmet, seated courses to irreverent street food trucks
        </li>
        <li>
          Convenient to public transportation, Highway 101 and the Bay Bridge
        </li>
        <li>
          Art direction, entertainment options, and design services to fully customize your event
        </li>
        <li>
          Sprung hardwood floors – great for dancing
        </li>
      </div>
    </ul>
    <FinalNote/>
    <div
      className="private-events-image"
      style={{ 'background-image': `url(${loftImage})`}}
    >
    </div>
  </div>
)

const FormInstructions = () => (
  <div id="form-instructions">
    <h2>
      To book an event, schedule a tour, or inquire about booking opportunities, please contact us using the form below. <br/> You can view venue specs <a href="/specs">here</a>
    </h2>
  </div>
)

const FinalNote = () => (
  <div id="final-note">
    <h2>
      As part of our commitment to the community, we donate a portion of event proceeds to local non-profits such as <a href="https://www.rootdivision.org/">Root Division</a>, an organization that provides art classes for under-funded San Francisco schools. We also offer a special rate to non-profits.
    </h2>
    <img src={pwmanholeImage} alt="pw_manhoe_white.png"/>
  </div>
)

const PrivateEvents = () => (
  <div id="private-events">
    <HeroImage image={corporateImage1} text="Private Events"/>
    <PrivateEventsInfo/>
    <FormInstructions />
    <ContactForm
      initialSelection='Private Events'
      initialFormType='privateevents'
    />
    <NewsletterSignUp />
  </div>
)

export default PrivateEvents
