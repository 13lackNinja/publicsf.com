import React, { Component } from 'react'
import { Link } from 'react-router-dom';
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
    this.isValidDate = this.isValidDate.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.initState = {
      'name': '',
      'start': '',
      'end': '',
      'artists': '',
      'description': '',
      'room': '',
      'price': '',
      'ticketURL': '',
      'imageURL': ''
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

  isValidDate(date) {
    const checkDate = new Date(date);
    return checkDate instanceof Date && !isNaN(date);
  }

  handleImageChange(e) {
    this.setState({
      imageURL: 'placeholder'
    });
    this.toggleButtonDisplay('initial');
  }

  handleStartChange(moment) {
    if (this.isValidDate(moment)) {
      console.log(moment.toDate());
      this.setState({
        start: moment.toDate().getTime()
      });
      this.toggleButtonDisplay('initial');
    } else {
      console.log('Invalid date');
    }
  }

  handleEndChange(moment) {
    if (this.isValidDate(moment)) {
      this.setState({
        end: moment.toDate().getTime()
      });
      this.toggleButtonDisplay('initial');
    } else {
      console.log('Invalid date');
    }
  }

  handleSubmit(e, callback) {
    e.preventDefault();

    let isStateInit = false;
    const warningText = document.getElementById('warning-text');

    for (let key in this.state) {
      if (this.state[key] === null) {
        warningText.textContent = `You might want to fill out ${key}`;
        isStateInit = true;
        return
      }
    }

    if (isStateInit) {
      console.log('form incomplete');
      return null
    } else {
      console.log('submitting...');

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
        });
      });

      const next = (snapshot) => {
        const uploadPercent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        submitButton.style.display = 'none';
        progressBar.style.width = `${uploadPercent}%`;
      };

      const error = (error) => { console.log(error.message) };

      const complete = () => {
        submitButton.style.display = 'initial';
        progressBar.style.width = '0px';
        console.log('Upload complete');

        callback();
      };

      imageUploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        complete
      );

      warningText.textContent = '';
      this.toggleButtonDisplay('none');
    }
  }

  toggleButtonDisplay(option) {
    const submitButton = document.getElementById('submit-button-dashboard');
    submitButton.style.display = option;
  }

  resetForm() {
    this.setState(this.initState);
  }

  render() {
    return (
      <form id="add-event-form">
        <h2>Add Event</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required/>
        </div>

        <div>
          <label htmlFor="start">Start</label>
          <DateTime
            value={this.state.start}
            onBlur={this.handleStartChange}
            inputProps={{ name: "start", required: true }}
            utc
          />
        </div>

        <div>
          <label htmlFor="end">End</label>
          <DateTime
            value={this.state.end}
            onBlur={this.handleEndChange}
            inputProps={{ name: "end", required: true }}
            utc
          />
        </div>

        <div>
          <label htmlFor="artists">Artists</label>
          <input
            type="text"
            name="artists"
            value={this.state.artists}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="room">Room</label>
          <select name="room" id='room-dropdown' onChange={this.handleChange} required>
            <option value=""></option>
            <option value="">Full Space</option>
            <option value="Main Room">Main Room</option>
            <option value="Loft">Loft</option>
          </select>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}/>
        </div>

        <div>
          <label htmlFor="ticketURL">Ticket URL</label>
          <input
            type="text"
            name="ticketURL"
            value={this.state.ticketURL}
            onChange={this.handleChange}
            required/>
        </div>

        <div>
          <label htmlFor="image">Upload Image</label>
          <input id="file-upload-button" type="file" onChange={this.handleImageChange} required/>
          <p id="upload-warning">Please make sure that your images conform to the <Link to='/docs'>docs</Link></p>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            cols="20"
            type="text"
            name="description"
            value={this.state.description}
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
              submit={(e) => this.handleSubmit(e, this.resetForm)}
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
