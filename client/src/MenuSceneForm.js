import React from 'react';

class MenuSceneForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.props.handleSubmit.bind(this);
    this.firebasePromise = false;
    this.state = {
      name: props.name,
      startHours: props.startHours,
      startMinutes: props.startMinues,
      startMeridiam: props.startMeridiam,
      endHours: props.endHours,
      endMinutes: props.endMinutes,
      endMeridiam: props.endMeridiam
    }
  }

  zeroPad(n) {
    let s = n.toString();
    while (s.length < 2) s = '0' + s;
    return s;
  }

  hoursList(n) {
    let options = [];

    for (let i = 1; i < n + 1; i++) {
      const hour = this.zeroPad(i);
      options.push(<option key={i}>{hour}</option>)
    }

    return options;
  }

  minutesList(n) {
    let options = [];

    for (let i = 0; i < n; i++) {
      const min = this.zeroPad(i);
      options.push(<option key={i}>{min}</option>)
    }

    return options;
  }

  render() {
    return (
      <div id="add-scene-page">
        <h2>Add Menu Scene</h2>
        <form id="add-scene-form">
          <div className="form-group">
            <label htmlFor="sceneName">Scene Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <div className="form-row" id="startTime">
              <div className="col">
                <select
                  className="form-control"
                  id="startHours"
                  name="startHours"
                  value={this.state.startHours}
                  onChange={this.handleChange}
                  required
                >
                  { this.hoursList(12) }
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  id="startMinutes"
                  name="startMinutes"
                  value={this.state.startMinutes}
                  onChange={this.handleChange}
                  required
                >
                  { this.minutesList(60) }
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  id="startMeridiam"
                  name="startMeridiam"
                  value={this.state.startMeridiam}
                  onChange={this.handleChange}
                  required
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <div className="form-row" id="endTime">
              <div className="col">
                <select
                  id="endHours"
                  className="form-control"
                  name="endHours"
                  value={this.state.endHours}
                  onChange={this.handleChange}
                  required
                >
                  { this.hoursList(12) }
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  id="startMinutes"
                  name="startMinutes"
                  value={this.state.endMinutes}
                  onChange={this.handleChange}
                  required
                >
                  { this.minutesList(60) }
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  id="startMeridiam"
                  value={this.state.endMeridiam}
                  onChange={this.handleChange}
                  required
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="sceneImage">Choose Image</label>
            <input
              type="file"
              className="form-control-file"
              id="sceneImage"
              name="file"
              required
            />
          </div>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </form>

      </div>
    )
  }

  componentWillUnmount() {
    if (this.firebasePromise) {
      this.firebasePromise.reject(() => console.log('Unhandled Firebase Promise'));
    }
  }
}

export default MenuSceneForm;
