import React, { Component } from 'react'
import { database, storage } from './firebase'
import ActionButton from './ActionButton'

import './styles/AddEventModule.css'

class AddEventModule extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.initState = {
      'name': null,
      'start': null,
      'end': null,
      'artists': null,
      'description': null,
      'room': null,
      'price': null,
      'ticketURL': null,
      'imageURL': null
    };
    this.state = this.initState;
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

    const form = document.getElementById('add-event-form');
    const newData = this.state;
    const eventRef = database.ref('/events');
    const storageRef = storage.ref('/event-images');
    const newImageFile = document.getElementById('file-upload-button').files[0];
    const newImageRef = storageRef.child(newImageFile.name);

    newImageRef.put(newImageFile).then(() => {
      newImageRef.getDownloadURL().then((url) => {
        newData.imageURL = url;
        eventRef.push(newData);
        this.setState(this.initState);
      });
    });

    form.reset();

  }

  render() {
    return (
      <form id="add-event-form">
        <h2>Add Event</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" defaultValue="Name" onInput={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="name">Start</label>
          <input type="datetime-local" name="start" defaultValue="Start" onBlur={this.handleDateChange} required/>
        </div>

        <div>
          <label htmlFor="name">End</label>
          <input type="datetime-local" name="end" defaultValue="End" onChange={this.handleDateChange} required/>
        </div>

        <div>
          <label htmlFor="artists">Artists</label>
          <input type="text" name="artists" defaultValue="Artists" onChange={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="room">Room</label>
          <input type="text" name="room" defaultValue="Room" onChange={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input type="text" name="price" defaultValue="Price" onChange={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="ticketURL">Ticket URL</label>
          <input type="text" name="ticketURL" defaultValue="Ticket URL" onChange={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="image">Upload Image</label>
          <input id="file-upload-button" type="file"/>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            cols="20"
            type="text"
            name="description"
            defaultValue="Description"
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
    )
  }
}

export default AddEventModule
