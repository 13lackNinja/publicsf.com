// Newlsetter signup module. Adds form submision to ticketfly email list.

import React from 'react'
import ActionButton from './ActionButton'

import './styles/NewsletterSignUp.css'

class NewsletterSignUp extends React.Component {
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
        mode: 'cors',
      }

      fetch(url, init)
        .then(() => { signup.innerHTML = '<h1>Email Recieved!</h1>'; })
    });
  }

  render() {
    return (
      <div id="newsletter-sign-up">
        <h2>Join the ranks</h2>
        <p>Members are eligible for free tickets, prizes, and more!</p>
        <form id='newsletter-signup-form'>
          <input type="text" name="email" placeholder="enter email address"/>
          <ActionButton
            text='submit'
            color='black'
            location='newsletter'
          />
        </form>
      </div>
    )
  }
}


export default NewsletterSignUp
