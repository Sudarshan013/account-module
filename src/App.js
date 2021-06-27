import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { AppProvider } from './shared/contexts/AppContext'
import ResourceHeader from './shared/components/ResourceHeader';

import AccountRouter from './account/Router'


export default function App(props) {
  return (
    <React.Fragment>
      <AppProvider>
        <ResourceHeader/>
        <Router>
          <Switch>
            <Route path="/accounts">
              <AccountRouter {...props}/>
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    </React.Fragment>
  )
}
