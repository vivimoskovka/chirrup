import axios from 'axios';
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import SignIn from './components/SignIn.js';
import Registration from './components/Registration.js'
import Main from './components/Main.js'

const AppRouter = () => {
  return(
    <Router>
      <Switch>
        <Route path ='/' exact component={SignIn}/>
        <Route path ='/registration/' exact component={Registration}/>
        <Route path ='/main/' exact component={Main}/>
      </Switch>
    </Router>
  )
}

export default AppRouter;
