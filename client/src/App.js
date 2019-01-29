// The top level component for the website. Inclues the react-router-dom
// BrowserRouter component. Site is rendered as a single-page app. All
// url-dependent content is rendered in the MainContent component.

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
