import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";

import "./style/main.scss";
import Auth from "./components/Auth/Auth";
import Profile from './components/Dashboard/Profile';

function main() {
  ReactDOM.render(
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Profile} />
    </BrowserRouter>,
    document.getElementById("root")
  );
}

document.addEventListener("DOMContentLoaded", main);