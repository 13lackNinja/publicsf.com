// NewsletterSignUp
// Adds form submision to ticketfly email list.

import React from 'react'
import { database } from './utility/firebase'

import './styles/NewsletterSignUp.css'

class NewsletterSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      input: 'enter email address',
      isSuccessful: false
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    database.ref('emails').push(this.state.input);
    this.setState({
      input: 'email recieved!',
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
          {this.state.isSuccessful &&
            <p id="newsletter-sign-up-success-message">Email received!</p>
          }
          <button
            id="newsletter-sign-up-submit-button"
            className="pw-action-button"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}


export default NewsletterSignUp
