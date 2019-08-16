import React from 'react';
import { database, storage } from './utility/firebase';
import SceneForm from './SceneForm'

import noMenuURL from './utility/pwHomeImageURL';

import './styles/AddScenePage.css';

class AddScenePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageFileChange = this.handleImageFileChange.bind(this);
    this.timesAreDifferent = this.timesAreDifferent.bind(this);
    this.hasImages = this.hasImages.bind(this);
    this.uploadImage = this.uploadImages.bind(this);
    this.sceneIsValid = this.sceneIsValid.bind(this);
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
      submitInProgress: false,
      isSuccessful: false,
      leftImageChooserFile: null,
      leftImageChooserURL: noMenuURL,
      rightImageChooserFile: null,
      rightImageChooserURL: noMenuURL
    }
    this.state = this.init;
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]:e.target.value });
  }

  handleImageFileChange(e) {
    const file = e.target.files[0];

    if (e.target.id === 'imageChooserL') {
      this.setState({ leftImageChooserFile: file });
    }

    if (e.target.id === 'imageChooserR') {
      this.setState({ rightImageChooserFile: file });
    }
  }

  timesAreDifferent() {
    const startHours = this.state.startHours;
    const endHours = this.state.endHours;
    const startMinutes = this.state.startMinutes;
    const endMinutes = this.state.endMinutes;
    const startMeridiam = this.state.startMeridiam;
    const endMeridiam = this.state.endMeridiam;

    if (
      startHours === endHours &&
      startMinutes === endMinutes &&
      startMeridiam === endMeridiam
    ) {
      window.alert('Start and stop times must be different');
      return false;
    } else {
      return true;
    }
  }

  sceneIsValid() {
    const newScene = {
      startHours: this.state.startHours,
      endHours: this.state.endHours,
      startMinutes: this.state.startMinutes,
      endMinutes: this.state.endMinutes,
      startMeridiam: this.state.startMeridiam,
      endMeridiam: this.state.endMeridiam
    }

    if(!this.props.verifyScene(newScene)) {
      window.alert('New scene must not overlap with existing scene');
      return false;
    } else {
      return true;
    }
  }

  hasImages() {
    const leftImage = this.state.leftImageChooserFile;
    const rightImage = this.state.rightImageChooserFile;

    if (!leftImage || !rightImage) {
      window.alert('Both images required');
      return false;
    } else {
      return true;
    }
  }

  uploadImages() {
    this.setState({ submitInProgress: true });

    const leftImage = this.state.leftImageChooserFile;
    const rightImage = this.state.rightImageChooserFile;
    const databaseRef = database.ref(`menu/sets/${this.props.setID}/scenes`);
    const storageRefLeft = storage.ref(`menu-images/${leftImage.name}`);
    const storageRefRight = storage.ref(`menu-images/${rightImage.name}`);

    const leftUploadTask = storageRefLeft.put(leftImage);
    const rightUploadTask = storageRefRight.put(rightImage);

    const leftURLPromise = leftUploadTask.then((uploadTaskSnapshot) => {
      return uploadTaskSnapshot.ref.getDownloadURL();
    });

    const rightURLPromise = rightUploadTask.then((uploadTaskSnapshot) => {
      return uploadTaskSnapshot.ref.getDownloadURL();
    });

    Promise.all([leftURLPromise, rightURLPromise]).then((urls) => {
      const newScene = {
        name: this.state.name,
        startHours: this.state.startHours,
        endHours: this.state.endHours,
        startMinutes: this.state.startMinutes,
        endMinutes: this.state.endMinutes,
        startMeridiam: this.state.startMeridiam,
        endMeridiam: this.state.endMeridiam,
        leftImageURL: urls[0],
        rightImageURL: urls[1]
      }

      databaseRef.push(newScene)
        .then(() => this.setState({
          submitInProgress: false,
          leftImageChooserURL: urls[0],
          rightImageChooserURL: urls[1]
        }));
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.timesAreDifferent()) return;

    if (!this.sceneIsValid()) return;

    if (!this.hasImages()) return;

    this.uploadImages();

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
          handleInputChange={this.handleInputChange}
          handleImageFileChange={this.handleImageFileChange}
          handleSubmit={this.handleSubmit}
          imageRequired={true}
          submitInProgress={this.state.submitInProgress}
          setID={this.props.setID}
          leftImageChooserFile={this.state.leftImageChooserFile}
          leftImageChooserURL={this.state.leftImageChooserURL}
          rightImageChooserFile={this.state.rightImageChooserFile}
          rightImageChooserURL={this.state.rightImageChooserURL}
        />
      </div>
    )
  }
}

export default AddScenePage;
