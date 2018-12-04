import React, { Component } from 'react';
import firebase, { database, storage } from './firebase';
import DateTime from 'react-datetime'
import ActionButton from './ActionButton';

import './styles/EditEventModule.css'

class EditEventModule extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.state = {
      name: props.name,
      start: props.start,
      end: props.end,
      artists: props.artists,
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
    this.toggleButtonDisplay('initial');
  }

  isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  handleStartChange(moment) {
    if (this.isValidDate(moment)) {
      this.setState({
        start: moment.toDate().getTime()
      });
      this.toggleButtonDisplay('initial');
    }
  }

  handleEndChange(moment) {
    if (this.isValidDate(moment)) {
      this.setState({
        end: moment.toDate().getTime()
      });
      this.toggleButtonDisplay('initial');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const submitButton = document.getElementById('submit-button-dashboard');
    const progressBar = document.getElementById('progress-bar');
    const newData = this.state;
    const eventRef = database.ref(`/events/${this.state.id}`);
    const newImageFile = document.getElementById('file-upload-button').files[0];

    if (newImageFile) {
      const oldImageRef = storage.refFromURL(this.state.imageURL);
      const newImageRef = storage.ref('event-images').child(newImageFile.name);

      oldImageRef.delete().catch(err => console.log(err.message));

      const imageUploadTask = newImageRef.put(newImageFile);

      const next = (snapshot) => {
        const uploadPercent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        submitButton.style.display = 'none';
        progressBar.style.width = `${uploadPercent}%`;
      };

      const error = (error) => { console.log(error.message) };

      const complete = () => {
        submitButton.style.display = 'initial';
        progressBar.style.width = '0px';
      };

      imageUploadTask.then(() => {
        newImageRef.getDownloadURL().then((url) => {
          newData.imageURL = url;
          eventRef.set(newData);
        });
      });

      imageUploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        complete
      );
    } else {
      eventRef.set(newData);
    }

    this.toggleButtonDisplay('none');
  }

  toggleButtonDisplay(option) {
    const submitButton = document.getElementById('submit-button-dashboard');
    submitButton.style.display = option;
  }

  render() {
    return (
      <div id="edit-event-module">
        <form id="edit-event-form">
          <h2>Edit Event</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" defaultValue={this.props.name} onInput={this.handleChange} required/>
          </div>

          <div>
            <label htmlFor="start">Start</label>
            <DateTime
              defaultValue={this.props.start}
              onBlur={this.handleStartChange}
              inputProps={{ name: "start" }}
              utc
              required
              disableCloseOnClickOutside={true}
              closeOnSelect={true}
            />
          </div>

          <div>
            <label htmlFor="end">End</label>
            <DateTime
              defaultValue={this.props.end}
              onBlur={this.handleEndChange}
              inputProps={{ name: "end" }}
              utc
              required
              disableCloseOnClickOutside={true}
              closeOnSelect={true}
            />
          </div>

          <div>
            <label htmlFor="artists">Artists</label>
            <input type="text" name="artists" defaultValue={this.props.artists} onChange={this.handleChange} required/>
          </div>

          <div>
            <label htmlFor="room">Room</label>
            <select name="room" id='room-dropdown' onChange={this.handleChange} defaultValue={this.props.room}>
              <option value="">Full Space</option>
              <option value="Main Room">Main Room</option>
              <option value="Loft">Loft</option>
            </select>
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
            <label htmlFor="image">Replace Image</label>
            <input id="file-upload-button" type="file" onChange={() => this.toggleButtonDisplay('initial')}/>
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

          <div id="progress-bar-container">
            <div id="progress-bar">
              <ActionButton
                text="submit"
                location="dashboard"
                color="white"
                type="submit"
                submit={this.handleSubmit}
              />
            </div>
          </div>

        </form>
      </div>
    )
  }
}

export default EditEventModule;
