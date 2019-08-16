import React from 'react'
import SceneForm from './SceneForm'
import { database, storage } from './utility/firebase'

class EditScenePage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageFileChange = this.handleImageFileChange.bind(this);
    this.deleteImages = this.deleteImages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateScene = this.updateScene.bind(this);
    this.state = { // Current Scene Loaded
      name: '',
      startHours: '',
      startMinutes: '',
      startMeridiam: '',
      endHours: '',
      endMinutes: '',
      endMeridiam: '',
      uploadPercent: 0,
      submitInProgress: false,
      leftImageChooserFile: null,
      leftImageChooserURL: null,
      rightImageChooserFile: null,
      rightImageChooserURL: null
    }
  }

  deleteImages() {
    if (this.state.leftImageChooserFile) {
      storage.refFromURL(this.state.leftImageChooserURL).delete();
    }

    if (this.state.rightImageChooserFile) {
      storage.refFromURL(this.state.rightImageChooserURL).delete();
    }
  }

  uploadImages() {
    this.setState({ submitInProgress: true });

    const setID = this.props.location.currentSetID;
    const sceneID = this.props.location.currentSceneID;
    const leftImage = this.state.leftImageChooserFile;
    const rightImage = this.state.rightImageChooserFile;
    const databaseRef = database.ref(`menu/sets/${setID}/scenes/${sceneID}`);
    let leftUploadPromise = this.state.leftImageChooserURL;
    let rightUploadPromise = this.state.rightImageChooserURL;

    if (leftImage) {
      const storageRefLeft = storage.ref(`menu-images/${leftImage.name}`);
      const leftUploadTask = storageRefLeft.put(leftImage);
      leftUploadPromise = leftUploadTask.then((uploadTaskSnapshot) => {
        return uploadTaskSnapshot.ref.getDownloadURL();
      });
    }

    if (rightImage) {
      const storageRefRight = storage.ref(`menu-images/${rightImage.name}`);
      const rightUploadTask = storageRefRight.put(rightImage);
      rightUploadPromise = rightUploadTask.then((uploadTaskSnapshot) => {
        return uploadTaskSnapshot.ref.getDownloadURL();
      });
    }

    Promise.all([leftUploadPromise, rightUploadPromise]).then((urls) => {
      const updatedScene = {
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

      databaseRef.set(updatedScene)
        .then(() => this.setState({
          submitInProgress: false,
          leftImageChooserURL: urls[0],
          rightImageChooserURL: urls[1]
        }));
    });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

  updateScene() {
    const setID = this.props.location.currentSetID;
    const sceneID = this.props.location.currentSceneID;

    const updatedScene = {
      name: this.state.name,
      startHours: this.state.startHours,
      endHours: this.state.endHours,
      startMinutes: this.state.startMinutes,
      endMinutes: this.state.endMinutes,
      startMeridiam: this.state.startMeridiam,
      endMeridiam: this.state.endMeridiam,
      leftImageURL: this.state.leftImageChooserURL,
      rightImageURL: this.state.rightImageChooserURL
    }

    database.ref(`menu/sets/${setID}/scenes/${sceneID}`).update(updatedScene);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.deleteImages();
    this.uploadImages();
  }

  componentDidMount() {
    this._isMounted = true;

    const setID = this.props.location.currentSetID;
    const sceneID = this.props.location.currentSceneID;
    const sceneURL = `menu/sets/${setID}/scenes/${sceneID}`;

    database.ref(sceneURL).on('value', (snapshot) => {
      const scene = snapshot.val();

      this.setState({
        name: scene.name,
        startHours: scene.startHours,
        startMinutes: scene.startMinutes,
        startMeridiam: scene.startMeridiam,
        endHours: scene.endHours,
        endMinutes: scene.endMinutes,
        endMeridiam: scene.endMeridiam,
        sceneID: sceneID,
        leftImageChooserURL: scene.leftImageURL,
        rightImageChooserURL: scene.rightImageURL
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div id="edit-scene-page">
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
          leftImageChooserFile={this.state.leftImageChooserFile}
          leftImageChooserURL={this.state.leftImageChooserURL}
          rightImageChooserFile={this.state.rightImageChooserFile}
          rightImageChooserURL={this.state.rightImageChooserURL}
          imageRequired={false}
          submitInProgress={this.state.submitInProgress}
          setID={this.props.setID}
        />
      </div>
    )
  }
}

export default EditScenePage
