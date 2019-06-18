// NewsletterSignUp
// Adds form submision to ticketfly email list.

import React from 'react'
import ActionButton from './ActionButton'
import { database } from './utility/firebase'

import './styles/NewsletterSignUp.css'

class NewsletterSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 'enter email address',
      isSuccessful: false
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    database.ref('emails').push(e.target.value);
    this.setState({
      input: 'enter email address',
      isSuccessful: true
    });
  }

  render() {
    return (
      <div id="newsletter-sign-up">
        <h1>Join the ranks</h1>
        <h3>Members are eligible for free tickets, prizes, and more!</h3>
        <form id='newsletter-signup-form'>
          <input
            type="text"
            name="email"
            placeholder={this.state.input}
            onChange={this.handleChange}
          />
          <ActionButton
            text='submit'
            color='black'
            location='newsletter'
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    )
  }
}


export default NewsletterSignUp
