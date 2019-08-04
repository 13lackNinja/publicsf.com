import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { database } from './utility/firebase'
import Breadcrumb from './Breadcrumb'
import MenuSetsPage from './MenuSetsPage'
import AddSetPage from './AddSetPage'
import EditSetPage from './EditSetPage'
import snapshotToArray from './utility/snapshotToArray'

import './styles/UpdateMenu.css'

class UpdateMenuPage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.setLocation = this.setLocation.bind(this);
    this.state = {
      scenes: null,
      location: {
        currentTitle: 'Update Menu',
        currentSetName: null,
        currentSetID: null,
        currentSceneName: null,
        currentSceneID: null,
      }
    };
  }

  setLocation(
    title,
    setName,
    setID,
    sceneName,
    sceneID,
  ) {
    if (this._isMounted) {
      this.setState({
        location: {
          currentTitle: title,
          currentSetName: setName,
          currentSetID: setID,
          currentSceneName: sceneName,
          currentSceneID: sceneID,
        }
      })
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      database.ref('menu').on('value', (snapshot) => {
        this.setState({ scenes: snapshotToArray(snapshot) });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="container-fluid" id="update-menu">
        <Breadcrumb
          setLocation={this.setLocation}
          location={this.state.location}
        />
        <h2 id="update-menu-title">{this.state.location.currentTitle}</h2>
        <Switch>
          <Route
            exact path="/staff/update-menu"
            render={() => (<MenuSetsPage setLocation={this.setLocation} />)}
          />
          <Route
            path="/staff/update-menu/add-set"
            component={AddSetPage}
          />
          <Route
            path="/staff/update-menu/edit-set"
            render={() => (
              <EditSetPage
                location={this.state.location}
                setLocation={this.setLocation}
              />)}
          />
        </Switch>
      </div>
    )
  }
}

export default UpdateMenuPage;
