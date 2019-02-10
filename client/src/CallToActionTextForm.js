import React from 'react';
import { database } from './utility/firebase';

import './styles/CallToActionTextForm.css';

class CallToActionTextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      clickoutURL: '',
      isChanged: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      isChanged: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    database.ref('callToAction').update({
      title: this.state.title,
      date: this.state.date,
      clickoutURL: this.state.clickoutURL
    });
    this.setState({ isChanged: false });
  }

  render() {
    return (
      <div id="call-to-action-text-form">
        <p>To make changes, update the text fields below and click 'submit'</p>
        <form>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder={this.state.title}
            onChange={this.handleChange}
          />

          <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            placeholder={this.state.date}
            onChange={this.handleChange}
          />

          <label htmlFor="clickoutURL">Clickout URL</label>
          <input
            type="text"
            name="clickoutURL"
            placeholder={this.state.clickoutURL}
            onChange={this.handleChange}
          />

          <button
            type="submit"
            onClick={this.handleSubmit}
            style={{"visibility": this.state.isChanged ? "visible" : "hidden" }}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }

  componentDidMount() {
    database.ref('callToAction').on('value', (snapshot) => {
      this.setState({
        title: snapshot.val().title,
        date: snapshot.val().date,
        clickoutURL: snapshot.val().clickoutURL
      });
    });
  }
}

export default CallToActionTextForm;
