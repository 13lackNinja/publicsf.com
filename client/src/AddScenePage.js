import React from 'react';
import firebase, { database, storage } from './utility/firebase';
import SceneForm from './SceneForm'

import './styles/AddScenePage.css';

class AddScenePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firebasePromise = false;
    this.init = {
      name: 'Name',
      startHours: '01',
      startMinutes: '00',
      startMeridiam: 'AM',
      endHours: '01',
      endMinutes: '00',
      endMeridiam: 'AM',
      uploadPercent: 0,
      submitInProgress: false
    }
    this.state = this.init;
  }

  handleChange(e) {
    this.setState({ [e.target.name]:e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const setID = this.props.setID;
    const newScene = {
      name: this.state.name,
      startHours: this.state.startHours,
      startMinutes: this.state.startMinutes,
      startMeridiam: this.state.startMeridiam,
      endHours: this.state.endHours,
      endMinutes: this.state.endMinutes,
      endMeridiam: this.state.endMeridiam
    };

    console.log(
      newScene.startHours === newScene.endHours &&
      newScene.startMinutes === newScene.endMinutes &&
      newScene.startMeridiam === newScene.endMeridiam
    );

    // Make sure times are different
    if (
      newScene.startHours === newScene.endHours &&
      newScene.startMinutes === newScene.endMinutes &&
      newScene.startMeridiam === newScene.endMeridiam
    ) {
      window.alert('Start and stop times must be different');
      return;
    }

    const scenesRef = database.ref(`/menu/sets/${setID}/scenes/`);
    const imagesRef = storage.ref('/menu-images');
    const image = document.getElementById('scene-image-input').files[0];

    if (!this.props.verifyScene(newScene)) {
      window.alert('New scene must not overlap with existing scene');
      return;
    }

    if (!image) {
      window.alert('Image required');
      return;
    };


    const newImageRef = imagesRef.child(image.name);
    const imageUploadTask = newImageRef.put(image);

    const next = (snapshot) => {
      const uploadPercent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      this.setState({ uploadPercent: uploadPercent });
    }

    const error = error => console.log(error.message);

    const complete = () => {
      this.setState({
        uploadPercent: 0,
        submitInProgress: false,
      });
      console.log('Upload Complete');
    }


    // Do the upload

    this.setState({ submitInProgress: true });

    imageUploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );

    imageUploadTask.then(() => {
      newImageRef.getDownloadURL().then((url) => {
        newScene.imageURL = url;
        this.firebasePromise = scenesRef.push(newScene).then(() => {
          this.firebasePromise = false;
          this.setState(this.init);
        })
      })
    })
  }

  componentWillUnmount() {
    if (this.firebasePromise) {
      this.firebasePromise.reject(() => console.log('Unhandled Firebase Promise'));
    }
  }

  render() {
    return (
      <div id="add-scene-page">
        <SceneForm
          name={this.state.name}
          startHours={this.state.startHours}
          startMinutes={this.state.startMinutes}
          startMeridiam={this.state.startMeridiam}
          endHours={this.state.endHours}
          endMinutes={this.state.endMinutes}
          endMeridiam={this.state.endMeridiam}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          imageRequired={true}
          submitInProgress={this.state.submitInProgress}
          uploadPercent={this.state.uploadPercent}
          setID={this.props.setID}
        />
      </div>
    )
  }
}

export default AddScenePage;
