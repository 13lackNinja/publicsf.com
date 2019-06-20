import React from 'react'
import HeroImage from './HeroImage.js'
import FAQ from './FAQ.js'
import ContactForm from './ContactForm.js'

import './styles/Connect.css'

import blueboltImage from './images/blue_bolt_dark.jpg'

class NewsletterText extends React.Component {
  componentDidMount() {
    const form = document.getElementById('newsletter-signup-form');
    const signup = document.getElementById('newsletter-sign-up')
    const url = 'https://www.ticketfly.com/account/emailSignup?orgId=1499';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const init = {
        method: 'post',
        body: formData,
        mode: 'cors'
      }

      fetch(url, init)
        .then(() => { signup.innerHTML = '<h1>Email Recieved!</h1>'})
    });
  }

  render() {
    return(
      <div id="newsletter-text">
        <h1 id="newsletter-text-header">Join the ranks</h1>
        <p>
          Newsletter subscribers are a valued community of true PW fans.
        </p>
        <p>
            We send only the best kinds of perks, including free tickets, first pass at some of the hottest shows in town, and clues to mysterious puzzles which unlock further prizes!
        </p>
        <div id="newsletter-sign-up">
          <form id='newsletter-signup-form'>
            <input type="text" name="email" placeholder="enter email address"/>
            <button type='submit'>submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const Connect = () => (
  <div id="connect">
    <HeroImage text="Connect" image={blueboltImage} />
    <NewsletterText />
    <div id="map"></div>
    <FAQ />
    <ContactForm
      initialSelection='General'
      initialFormType='general'
    />
  </div>
)


export default Connect
