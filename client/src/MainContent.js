import React from 'react'
import {Switch, Route } from 'react-router-dom';
import Home from './Home'
import InTheWorks from './InTheWorks'
import About from './About'
import PrivateEvents from './PrivateEvents'
import Connect from './Connect'
import Specs from './Specs'
import Booking from './Booking'

import './styles/MainContent.css'

const MainContent = () => (
  <div id="main-content">
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/intheworks" component={InTheWorks}></Route>
      <Route path="/about" component={About}></Route>
      <Route path="/privateevents" component={PrivateEvents}></Route>
      <Route path="/connect" component={Connect}></Route>
      <Route path="/specs" component={Specs}></Route>
      <Route path="/booking" component={Booking}></Route>
    </Switch>
  </div>
)

export default MainContent
