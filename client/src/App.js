import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainContent from './MainContent.js'

import './styles/App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <MainContent />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
