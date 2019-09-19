import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { database } from './utility/firebase';
import snapshotToArray from './utility/snapshotToArray'
import timeDataToNum from './utility/timeDataToNum'
import noMenuURL from './utility/pwHomeImageURL'

import './styles/MenuDisplay.css';

class MenuDisplay extends React.Component {
  constructor(props) {
    super(props);
    this._inverval = null;
    this.checkScene = this.checkScene.bind(this);
    this.state = {
      activeScenes: [],
      leftDisplayURL: noMenuURL,
      rightDisplayURL: noMenuURL,
      loftDisplayURL: noMenuURL
    };
  }

  toggleFullScreen() {
    const menuImage = document.getElementById('menu-image');

    if (document.fullscreenEnabled) {
      menuImage.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  checkScene() { // Every minute, check scene against current time
    const activeScenes = this.state.activeScenes;

    activeScenes.forEach(scene => {
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

      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

      const currentTime = timeDataToNum(
        currentHours.toString(),
        currentMinutes.toString(),
        'AM' // Passing AM because currentHours is already in 24 hour format
      );

      // Condition 1: Stop time is less that start time
      if (sceneStart < sceneEnd) {
        if (sceneStart <= currentTime && currentTime <= sceneEnd) {
          this.setState({
            leftDisplayURL: scene.leftImageURL,
            rightDisplayURL: scene.rightImageURL,
            loftDisplayURL: scene.loftImageURL
          });
        }
      }

      // Condition 2: Stop time is greater than start time
      if (sceneStart > sceneEnd) {
        if (
          (currentTime >= 0 && currentTime <= sceneEnd)
          ||
          (currentTime >= sceneStart && currentTime <= 1400)
        ) {
          this.setState({
            leftDisplayURL: scene.leftImageURL,
            rightDisplayURL: scene.rightImageURL,
            loftDisplayURL: scene.loftImageURL
          });
        }
      }
    });
  }

  componentDidMount() {
    // Load the active set and grab the ID
    if (!this.state.activeScenes[0]) {
      database.ref('menu/activeSet').on('value', (snapshot) => {
        const activeSetID = snapshot.val();

        database.ref(`menu/sets/${activeSetID}/scenes`).on('value', (snapshot) => {
          const activeScenes = snapshotToArray(snapshot);

          this.setState({ activeScenes: activeScenes });

          this._interval = setInterval(this.checkScene, 3000);
        });
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    return (
      <div className="container-fluid" id="menu-display">
        <Switch>
          <Route
            path='/menu/left'
            render={() => (
              <img
                src={this.state.leftDisplayURL}
                alt={this.state.leftDisplayURL}
                id="menu-image"
                onDoubleClick={this.toggleFullScreen}
              />
            )}
          />
          <Route
            path='/menu/right'
            render={() => (
              <img
                src={this.state.rightDisplayURL}
                alt={this.state.rightDisplayURL}
                id="menu-image"
                onDoubleClick={this.toggleFullScreen}
              />
            )}
          />
          <Route
            path='/menu/loft'
            render={() => (
              <img
                src={this.state.loftDisplayURL}
                alt={this.state.loftDisplayURL}
                id="menu-image"
                onDoubleClick={this.toggleFullScreen}
              />
            )}
          />
        </Switch>

      </div>
    )
  }
}

export default MenuDisplay;
