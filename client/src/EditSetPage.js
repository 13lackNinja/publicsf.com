import React from 'react'
import UpdateMenuToolbar from './UpdateMenuToolbar'
import EditSetList from './EditSetList'
import AddScenePage from './AddScenePage'
import EditScenePage from './EditScenePage'
import { database } from './utility/firebase'
import timeDataToNum from './utility/timeDataToNum'
import { Switch, Route } from 'react-router-dom'

import './styles/EditSetPage.css'

const EditSetUI = (props) => (
  <React.Fragment>
    <UpdateMenuToolbar
      title="Edit Set"
      url="edit-set/add-scene"
      buttonText="Add Scene"
      setLocation={() => {
        props.setLocation(
          'Add Scene',
          props.location.currentSetName,
          props.location.currentSetID,
          'Add Scene',
          null,
          'edit-set/add-scene'
        )
      }}
    />
    <EditSetList
      scenes={props.scenes}
      location={props.location}
      setLocation={props.setLocation}
      deleteScene={props.deleteScene}
    />
  </React.Fragment>
)

class EditSetPage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.deleteScene = this.deleteScene.bind(this);
    this.verifyScene = this.verifyScene.bind(this);
    this.state = { scenes: [] };
  }

  deleteScene(e) {
    const setID = this.props.location.currentSetID;
    const sceneID = e.currentTarget.dataset.scene_id;

    database.ref(`menu/sets/${setID}/scenes/${sceneID}`).remove();
  }

  verifyScene(scene) { // Returns true if scene doesn't overlap
    let sceneIsValid = true;
    const currentScenes = this.state.scenes;
    const sceneStart = timeDataToNum(
      scene.startHours,
      scene.startMinutes,
      scene.startMeridiam
    );
    const sceneEnd = timeDataToNum(
      scene.endHours,
      scene.endMinutes,
      scene.endMeridiam
    );

    // console.log('input scene hours: ' + scene.startHours);
    // console.log('input scene minutes: ' + scene.startMinutes);
    // console.log('input scene meridiam: ' + scene.startMeridiam);
    // console.log('input scene start: ' + sceneStart);

    // Loop through existing scenes, set sceneIsValid to false if time overlap exists
    if (currentScenes.length) {
      currentScenes.forEach((currentScene) => {
        // console.log('verifySceen foreach ran');

        if (scene.sceneID !== currentScene.sceneID) {

          const currentSceneStart = timeDataToNum(
            currentScene.startHours,
            currentScene.startMinutes,
            currentScene.startMeridiam
          )
          const currentSceneEnd = timeDataToNum(
            currentScene.endHours,
            currentScene.endMinutes,
            currentScene.endMeridiam
          )

          console.log('Current Scene Start: ' + currentSceneStart);
          console.log('Current Scene End: ' + currentSceneEnd);
          console.log('Input Scene Start: ' + sceneStart);
          console.log('Input Scene End: ' + sceneEnd);

          // Condition 1
          if (currentSceneStart < currentSceneEnd) {
            if (
              currentSceneStart <= sceneStart && sceneStart <= currentSceneEnd
            ) { sceneIsValid = false; console.log('Scene Start Overlapped'); } else if (
              currentSceneStart <= sceneEnd && sceneEnd <= currentSceneEnd
            ) { sceneIsValid = false; console.log('Scene End Overlapped'); }
          }

          // Condition 2
          if (currentSceneStart > currentSceneEnd) {
            if (
              currentSceneStart >= sceneStart && sceneStart >= currentSceneEnd
            ) { sceneIsValid = false; console.log('Scene Start Overlapped'); } else if (
              currentSceneStart >= sceneEnd && sceneEnd >= currentSceneEnd
            ) { sceneIsValid = false; console.log('Scene End Overlapped'); }
          }
        }
      })
    }
    return sceneIsValid;
  }

  componentDidMount() {
    this._isMounted = true;

    const setID = this.props.location.currentSetID;

    database.ref(`/menu/sets/${setID}/scenes`).on('value', (snapshot) => {
      const result = snapshot.val();
      let scenes = [];

      for (const key in result) {
        result[key].sceneID = key;
        scenes.push(result[key]);
      }

      if (this._isMounted) {
        this.setState({ scenes: scenes });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  render() {
    return (
      <div id="edit-set-page">
        <Switch>
          <Route
            exact path="/staff/update-menu/edit-set"
            render={() => (
              <EditSetUI
                setLocation={this.props.setLocation}
                location={this.props.location}
                scenes={this.state.scenes}
                deleteScene={this.deleteScene}
              />
            )}
          />
          <Route
            path="/staff/update-menu/edit-set/add-scene"
            render={() => (
              <AddScenePage
                setID={this.props.location.currentSetID}
                verifyScene={this.verifyScene}
              />
            )}
          />
          <Route
            path="/staff/update-menu/edit-set/edit-scene"
            render={() => (
              <EditScenePage
                location={this.props.location}
                setLocation={this.props.setLocation}
                verifyScene={this.verifyScene}
              />
            )}
          />
        </Switch>

      </div>
    )
  }
}

export default EditSetPage
