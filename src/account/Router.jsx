import React, { Fragment } from 'react'
import { Switch , Route} from "react-router-dom"

import Index from "./Index"
import Form from "./Form"

export default function Router() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/accounts">
          <Index/>
        </Route>
        <Route exact path="/accounts/:id/details">
          <Form/>          
        </Route>
      </Switch>
    </Fragment>
  )
}
