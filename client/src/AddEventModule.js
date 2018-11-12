import React, { Component } from 'react'
import firebase, { database, storage } from './firebase'
import DateTime from 'react-datetime'
import ActionButton from './ActionButton'

import './styles/AddEventModule.css'
import './styles/DateTime.css'

class AddEventModule extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
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
    this.firebasePromise = null;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.toggleButtonDisplay('initial');
  }

  handleImageChange(e) {
    this.setState({
      imageURL: 'placeholder'
    });
    this.toggleButtonDisplay('initial');
  }

  handleStartChange(moment) {
    this.setState({
      start: moment.toDate().getTime()
    });
    this.toggleButtonDisplay('initial');
  }

  handleEndChange(moment) {
    this.setState({
      end: moment.toDate().getTime()
    });
    this.toggleButtonDisplay('initial');
  }

  handleSubmit(e) {
    e.preventDefault();

    let isStateInit = false;
    const warningText = document.getElementById('warning-text');

    for (let key in this.state) {
      if (this.state[key] === null) {
        warningText.textContent = `You might want to fill out ${key}`;
        isStateInit = true;
        return
      } else {

      }
    }

    if (isStateInit) {
      console.log('form incomplete');
      return null
    } else {
      console.log('submitting...');

      const form = document.getElementById('add-event-form');
      const progressBar = document.getElementById('progress-bar');
      const submitButton = document.getElementById('submit-button-dashboard');
      const newData = this.state;
      const eventRef = database.ref('/events');
      const storageRef = storage.ref('/event-images');
      const newImageFile = document.getElementById('file-upload-button').files[0];

      const newImageRef = storageRef.child(newImageFile.name);

      const imageUploadTask = newImageRef.put(newImageFile);

      imageUploadTask.then(() => {
        newImageRef.getDownloadURL().then((url) => {
          newData.imageURL = url;
          this.firebasePromise = eventRef.push(newData).then(() => {
            this.firebasePromise = null;
          });
          this.setState(this.initState);
        });
      });

      const next = (snapshot) => {
        const uploadPercent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        submitButton.style.display = 'none';
        progressBar.style.width = `${uploadPercent}%`;
      };

      const error = (error) => { console.log(error) };

      const complete = () => {
        submitButton.style.display = 'initial';
        progressBar.style.width = '0px';
        console.log('upload complete');
      };

      imageUploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        complete
      );

      form.reset();
      warningText.textContent = '';
      this.toggleButtonDisplay('none');
    }
  }

  toggleButtonDisplay(option) {
    const submitButton = document.getElementById('submit-button-dashboard');
    submitButton.style.display = option;
  }

  render() {
    return (
      <form id="add-event-form">
        <h2>Add Event</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Name" onChange={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="start">Start</label>
          <DateTime
            placeholder="Start"
            onChange={this.handleStartChange}
            inputProps={{ name: "start", required: true }}
            utc
          />
        </div>

        <div>
          <label htmlFor="end">End</label>
          <DateTime
            placeholder="End"
            onChange={this.handleEndChange}
            inputProps={{ name: "end", required: true }}
            utc
            required={true}/>
        </div>

        <div>
          <label htmlFor="artists">Artists</label>
          <input type="text" name="artists" placeholder="Artists" onChange={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="room">Room</label>
          <select name="room" id='room-dropdown' onChange={this.handleChange} required>
            <option value="">Full Space</option>
            <option value="Main Room">Main Room</option>
            <option value="Loft">Loft</option>
          </select>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input type="text" name="price" placeholder="Price" onChange={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="ticketURL">Ticket URL</label>
          <input type="text" name="ticketURL" placeholder="Ticket URL" onChange={this.handleChange} required/>
        </div>

        <div>
          <label htmlFor="image">Upload Image</label>
          <input id="file-upload-button" type="file" onChange={this.handleImageChange} required/>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            cols="20"
            type="text"
            name="description"
            placeholder="Description"
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
        <p id='warning-text'></p>

      </form>
    )
  }

  componentWillUnmount() {
    if (this.firebasePromise) {
      this.firebasePromise.reject((err) => console.log(err.message));
    }
  }

}

export default AddEventModule
