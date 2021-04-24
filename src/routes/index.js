import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import HomePage from "../components/Home";
import AboutPage from "../components/About";
import DisclaimerPage from "../components/Disclaimer";

function AppRoutes(){
  return(
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/disclaimer">Disclaimer</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" exact={true}>
          <HomePage/>
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/disclaimer">
          <DisclaimerPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRoutes;
