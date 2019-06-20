import React from 'react'
import { database } from './utility/firebase'

import './styles/AddSetPage.css'

class AddSetPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: 'Name',
      wasSuccessful: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('add-set-form');
    const newSet = { name: this.state.name }

    database.ref('menu/sets').push(newSet, () => {
      this.setState({ wasSuccessful: true });
      form.reset();
    });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div id="add-set-page">
        <form id="add-set-form">
          <label htmlFor="set-name-input">Name</label>
          <input
            className="pw-input-field"
            id="set-name-input"
            type="text"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="pw-orange-button"
          >
            Submit
          </button>
          {this.state.wasSuccessful &&
            <p id="add-set-success-message">Set Created</p>
          }
        </form>
      </div>
    )
  }
}

export default AddSetPage
