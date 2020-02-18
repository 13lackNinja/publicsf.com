import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Staff from './Staff'
import MenuDisplay from './MenuDisplay'
import NotFound from './NotFound'

import './styles/MainContent.css'

const MainContent = () => (
  <div id="main-content">
    <Switch>
      <Route exact path="/" component={Staff}></Route>
      <Route path="/menu" component={MenuDisplay}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </div>
)

export default MainContent
