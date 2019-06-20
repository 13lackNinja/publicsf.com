import React from 'react'
import SceneForm from './SceneForm'
import firebase, { database, storage } from './utility/firebase'

class EditScenePage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { // Current Scene Loaded
      name: '',
      startHours: '',
      startMinutes: '',
      startMeridiam: '',
      endHours: '',
      endMinutes: '',
      endMeridiam: '',
      imageURL: '',
      uploadPercent: 0,
      submitInProgress: false
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();


    const setID = this.props.location.currentSetID;
    const sceneID = this.props.location.currentSceneID;
    const sceneRef = database.ref(`/menu/sets/${setID}/scenes/${sceneID}`);
    const imagesRef = storage.ref('/menu-images');
    const newImage = document.getElementById('scene-image-input').files[0];
    const updatedScene = {
      name: this.state.name,
      startHours: this.state.startHours,
      startMinutes: this.state.startMinutes,
      startMeridiam: this.state.startMeridiam,
      endHours: this.state.endHours,
      endMinutes: this.state.endMinutes,
      endMeridiam: this.state.endMeridiam,
      sceneID: this.state.sceneID
    }


    if (!this.props.verifyScene(updatedScene)) {
      window.alert('Scene must not overlap with existing scene');
      return;
    }


    // If no new image, only update data
    if (!newImage) {
      sceneRef.update(updatedScene).then(() => {
        this.props.setLocation(
          `Edit ${updatedScene.name}`,
          this.props.location.currentSetName,
          setID,
          updatedScene.name,
          sceneID
        );
      });
    } else {
      // 1. Delete existing image
      // 2. Upload a new image
      // 3. Update the image url

      const currentImageRef = storage.refFromURL(this.state.imageURL);
      const newImageRef = imagesRef.child(`/${newImage.name}`);

      currentImageRef.delete();

      const imageUploadTask = newImageRef.put(newImage);

      const next = (snapshot) => {
        const uploadPercent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        this.setState({ uploadPercent: uploadPercent });
      }

      const error = error => console.log(error.message);

      const complete = () => {
        this.setState({
          uploadPercent: 0,
          submitInProgress: false
        });
        console.log('Upload Complete');
      }

      this.setState({ submitInProgress: true });

      imageUploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        complete
      );

      imageUploadTask.then(() => {
        newImageRef.getDownloadURL().then((url) => {
          updatedScene.imageURL = url;
          sceneRef.update(updatedScene).then(() => {
            this.props.setLocation(
              `Edit ${updatedScene.name}`,
              this.props.location.currentSetName,
              setID,
              updatedScene.name,
              sceneID
            )
          });
        });
      });
    }
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
        imageURL: scene.imageURL,
        sceneID: sceneID

      })
    })
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
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          imageURL={this.state.imageURL}
          imageRequired={false}
          submitInProgress={this.state.submitInProgress}
          uploadPercent={this.state.uploadPercent}
          setID={this.props.setID}
        />
      </div>
    )
  }
}

export default EditScenePage
