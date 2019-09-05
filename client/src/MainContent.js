import React from 'react'
import {Switch, Route } from 'react-router-dom';
import Home from './Home'
import Calendar from './Calendar'
import About from './About'
import PrivateEvents from './PrivateEvents'
import Connect from './Connect'
import Specs from './Specs'
import Docs from './Docs'
import Booking from './Booking'
import Staff from './Staff'
import MenuDisplay from './MenuDisplay'
import NotFound from './NotFound'

import './styles/MainContent.css'

const MainContent = () => (
  <div id="main-content">
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/calendar" component={Calendar}></Route>
      <Route path="/about" component={About}></Route>
      <Route path="/privateevents" component={PrivateEvents}></Route>
      <Route path="/connect" component={Connect}></Route>
      <Route path="/specs" component={Specs}></Route>
      <Route path="/docs" component={Docs}></Route>
      <Route path="/booking" component={Booking}></Route>
      <Route path="/staff" component={Staff}></Route>
      <Route path="/menu" component={MenuDisplay}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </div>
)

export default MainContent
