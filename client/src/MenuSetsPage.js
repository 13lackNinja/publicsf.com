import React from 'react'
import { database } from './utility/firebase'
import UpdateMenuToolbar from './UpdateMenuToolbar'
import MenuSetsList from './MenuSetsList'

import './styles/MenuSetsPage.css'

class MenuSetsPage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.activateSet = this.activateSet.bind(this);
    this.deleteSet = this.deleteSet.bind(this);
    this.state = {
      sets: [],
      activeSet: '',
    }
  }

  activateSet(setID) {
    database.ref(`menu/activeSet`).set(setID);

    if (this._isMounted) {
      this.setState({ activeSet: setID });
    }
  }

  deleteSet(e) {
    const setID = e.currentTarget.dataset.set_id;

    if (setID === this.state.activeSet) {
      window.alert('Cannot delete active set');
      return;
    }

    database.ref(`menu/sets/${setID}`).remove();
  }

  componentDidMount() {
    this._isMounted = true;

    // Get Scenes
    database.ref('menu/sets').on('value', (snapshot) => {
      const result = snapshot.val();
      let sets = [];

      for (const key in result) {
        sets.push({
          setID: key,
          name: result[key].name
        });
      }

      if (this._isMounted) {
        this.setState({ sets: sets });
      }
    });

    // Get Active Set
    database.ref('menu/activeSet').on('value', (snapshot) => {
      this.setState({ activeSet: snapshot.val() });
    });

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return(
      <div id="menu-sets-page">

        <UpdateMenuToolbar
          title="Menu Sets"
          buttonText="Add Set"
          setLocation={() => {
            this.props.setLocation(
              'Add Set',
              'Add Set',
              null,
              null,
              null,
            )}}
          url='add-set'
        />

        <MenuSetsList
          sets={this.state.sets}
          setLocation={this.props.setLocation}
          deleteSet={this.deleteSet}
          activateSet={this.activateSet}
          activeSet={this.state.activeSet}
        />

      </div>
    )
  }
}

export default MenuSetsPage
