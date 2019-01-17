import React, { Component } from 'react';
import firebase, { storage, database } from './utility/firebase'

import './styles/EditImageModule.css'

class EditEventModule extends Component {
  constructor(props) {
    super(props);
    this.handleReplace = this.handleReplace.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      imageURL: this.props.imageURL
    }
    this.buttonRef = React.createRef();
    this.inputRef = React.createRef();
    this.labelRef = React.createRef();
    this.progressBarRef = React.createRef();
  }

  handleChange(e) {
    this.buttonRef.current.style.visibility = 'visible';
    this.labelRef.current.style.visibility = 'hidden';
  }

  handleReplace(e, imageURL) {
    const fileInput = this.inputRef.current;
    const newImage = fileInput.files[0];
    const labelRef = this.labelRef.current;
    const replaceButton = this.buttonRef.current;
    const progressBar = this.progressBarRef.current;
    const oldImageRef = storage.refFromURL(imageURL);
    const newImageRef = storage.ref('carousel-images').child(newImage.name);
    const urlRef = database.ref(`carousel/image${this.props.number}`);

    labelRef.style.visibility = 'hidden';
    replaceButton.style.visibility = 'hidden';

    oldImageRef.delete();

    const imageUploadTask = newImageRef.put(newImage);

    const next = (snapshot) => {
      const uploadPercent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      progressBar.style.width = `${uploadPercent}%`;
      console.log(`${uploadPercent}% uploaded ...`);
    }

    const error = (error) => console.log(error.message);

    const complete = () => {
      progressBar.style.width = '0%';
      labelRef.style.visibility = 'visible';
      console.log('Upload complete');
    }

    imageUploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );

    imageUploadTask.then(() => {
      newImageRef.getDownloadURL().then((url) => {
        urlRef.set(url);
        this.setState({ imageURL: url });
      });
    });
  }

  render() {
    return (
      <div className="edit-image-module">
        <img src={this.state.imageURL} alt={this.state.imageURL}/>
        <label
          ref={this.labelRef}
          className="edit-image-label">
          Choose File
          <input
            ref={this.inputRef}
            className="edit-image-input"
            type="file"
            onChange={this.handleChange}
          />
        </label>
        <button
          ref={this.buttonRef}
          className="edit-image-replace-button"
          onClick={(e) => this.handleReplace(e, this.state.imageURL)}
        >
          Replace
        </button>
        <div className="progress-bar" ref={this.progressBarRef}></div>
      </div>
    )
  }
}

export default EditEventModule;
