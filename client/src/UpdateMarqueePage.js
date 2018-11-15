import React, { Component } from 'react';
import { database } from './firebase';
import Marquee from './Marquee';
import ActionButton from './ActionButton'

import './styles/UpdateMarqueePage.css'

class UpdateMarqueePage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      text: '',
      url: ''
    }
    this.marqueeRef = database.ref('marquee');
  }

  handleChange(e) {
    const submitButton = document.getElementById('submit-button-update-carousel');

    this.setState({
      [e.target.name]: e.target.value
    });

    submitButton.style.visibility = 'visible';
  }

  handleSubmit() {
    const textInput = document.getElementById('marquee-text-input');
    const urlInput = document.getElementById('marquee-url-input');
    const submitButton = document.getElementById('submit-button-update-carousel');

    this.marqueeRef.child('text').set(this.state.text).then(() => {
      textInput.value = '';
    });

    this.marqueeRef.child('url').set(this.state.url).then(() => {
      urlInput.value = '';
    });

    submitButton.style.visibility = 'hidden';
  }

  render() {
    return (
      <div id="update-marquee-page">
        <h2>Update Marquee</h2>
        <div id="update-marquee-module">
          <input
            id="marquee-text-input"
            type="text"
            name="text"
            placeholder={this.state.text}
            onChange={this.handleChange}
          />
          <Marquee text={this.state.text}/>
          <input
            type="text"
            id="marquee-url-input"
            name="url"
            placeholder={this.state.url}
            onChange={this.handleChange}
          />
          <ActionButton
            text='submit'
            submit={this.handleSubmit}
            color="white"
            location="update-carousel"
          />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.marqueeRef.child('text').once('value', (snapshot) => {
      this.setState({ text: snapshot.val() });
    });

    this.marqueeRef.child('url').once('value', (snapshot) => {
      this.setState({ url: snapshot.val() });
    });
  }
}

export default UpdateMarqueePage;
