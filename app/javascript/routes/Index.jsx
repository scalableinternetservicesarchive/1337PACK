import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Users from "../components/Users";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Events from "../components/Events";
import Event from "../components/Event";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users" exact component={Users} />
      <Route path="/user/:id" exact component={Profile} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/events" exact component={Events} />
      <Route path="/event/:id" exact component={Event} />
    </Switch>
  </Router>
);
