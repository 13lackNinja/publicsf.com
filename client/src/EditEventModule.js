import React, { Component } from 'react';
import { database, storage } from './firebase';
import ActionButton from './ActionButton';

import './styles/EditEventModule.css'

class EditEventModule extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: props.name,
      start: props.start,
      end: props.end,
      artists: props.end,
      room: props.room,
      price: props.price,
      ticketURL: props.price,
      imageURL: props.imageURL,
      description: props.description,
      id: props.id
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleDateChange(e) {
    const newDate = new Date(e.target.value);
    const newUnixStamp = newDate.getTime();
    this.setState({
      [e.target.name]: newUnixStamp
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newData = this.state;
    const eventRef = database.ref(`/events/${this.state.id}`);
    const newImageRef = storage.refFromURL(this.state.imageURL);
    const newImageFile = document.getElementById('file-upload-button').files[0];

    if (newImageFile) {
      newImageRef.put(newImageFile);
    }

    eventRef.set(newData);
  }

  render() {
    return (
      <div id="edit-event-module">
        <form id="edit-event-form">
          <h2>{this.props.name}</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" defaultValue={this.props.name} onInput={this.handleChange} required/>
          </div>

          <div>
            <label htmlFor="start">Start</label>
            <input type="datetime-local" name="start" defaultValue={this.props.start} onBlur={this.handleDateChange} required/>
          </div>

          <div>
            <label htmlFor="end">End</label>
            <input type="datetime-local" name="end" defaultValue={this.props.end} onChange={this.handleDateChange} required/>
          </div>

          <div>
            <label htmlFor="artists">Artists</label>
            <input type="text" name="artists" defaultValue={this.props.artists} onChange={this.handleChange} required/>
          </div>

          <div>
            <label htmlFor="room">Room</label>
            <input type="text" name="room" defaultValue={this.props.room} onChange={this.handleChange} required/>
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input type="text" name="price" defaultValue={this.props.price} onChange={this.handleChange} required/>
          </div>

          <div>
            <label htmlFor="ticketURL">Ticket URL</label>
            <input type="text" name="ticketURL" defaultValue={this.props.ticketURL} onChange={this.handleChange} required/>
          </div>

          <div>
            <label htmlFor="image">Upload Image</label>
            <input id="file-upload-button" type="file" required/>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              rows="3"
              cols="20"
              type="text"
              name="description"
              defaultValue={this.props.description}
              onChange={this.handleChange}
              required
            />
          </div>

          <ActionButton
            text="submit"
            location="dashboard"
            color="white"
            type="submit"
            submit={this.handleSubmit}
          />
        </form>
      </div>
    )
  }
}

export default EditEventModule;
