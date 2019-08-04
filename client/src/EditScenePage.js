import React from 'react'
import SceneForm from './SceneForm'
import firebase, { database, storage } from './utility/firebase'

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
    const ref = storage.ref('menu-images');
    const leftImage = this.state.leftImageChooserFile;
    const rightImage = this.state.rightImageChooserFile;

    if (leftImage || rightImage) this.setState({ submitInProgress: true });

    let uploadPromises = [];

    if (leftImage) {
      const uploadTaskL = ref.put(leftImage);
      uploadPromises.push(uploadTaskL);

      uploadTaskL.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {},
        (error) => console.log(error),
        () => console.log('Left Upload Complete')
      );

      uploadTaskL.then((uploadTaskSnapshot) => {
        uploadTaskSnapshot.ref.getDownloadURL().then((url) => {
          this.setState({ leftImageChooserURL: url });
        });
      });
    }

    if (rightImage) {
      const uploadTaskR = ref.put(rightImage);
      uploadPromises.push(uploadTaskR);

      uploadTaskR.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {},
        (error) => console.log(error),
        () => console.log('Right Upload Complete')
      );

      uploadTaskR.then((uploadTaskSnapshot) => {
        uploadTaskSnapshot.ref.getDownloadURL().then((url) => {
          this.setState({ rightImageChooserURL: url });
        });
      });
    }

    Promise.all(uploadPromises).then(() => this.setState({ submitInProgress: false }));
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
      endMeridiam: this.state.endMeridiam
    }

    database.ref(`menu/sets/${setID}/scenes/${sceneID}`).update(updatedScene);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.deleteImages();
    this.uploadImages();
    this.updateScene();
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
