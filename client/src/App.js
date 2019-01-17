import React, { Component } from 'react'
import './utility/analytics';
import { BrowserRouter } from 'react-router-dom'
import TopNav from './TopNav.js'
import MainContent from './MainContent.js'
import Footer from './Footer.js'

import './styles/App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <TopNav />
          <MainContent />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
