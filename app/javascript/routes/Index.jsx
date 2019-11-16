import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import User from "../components/User";
import Users from "../components/Users";
import Signup from "../components/Signup";
import Login from "../components/Login";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users" exact component={Users} />
      <Route path="/user/:id" exact component={User} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </Router>
);
