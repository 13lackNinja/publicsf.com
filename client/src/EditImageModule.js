import React, { Component } from 'react';
import { storage, database } from './firebase'

import './styles/EditImageModule.css'

class EditEventModule extends Component {
  constructor(props) {
    super(props);
    this.handleReplace = this.handleReplace.bind(this);
    this.state = {
      imageURL: this.props.imageURL
    }
  }

  handleReplace(e, imageURL) {
    const fileInput = e.target.previousElementSibling;
    const imageRef = storage.refFromURL(imageURL);
    const newImage = fileInput.files[0];
    const urlRef = database.ref(`carousel/image${this.props.id}`);

    imageRef.put(newImage).then(() => {
      imageRef.getDownloadURL().then((url) => {
        urlRef.set(url);
      });
    });
  }

  render() {
    return (
      <div className="edit-image-module">
        <img src={this.state.imageURL} alt={this.state.imageURL}/>
        <input type="file"/>
        <button onClick={(e) => this.handleReplace(e, this.state.imageURL)}>Replace</button>
      </div>
    )
  }
}

export default EditEventModule;
