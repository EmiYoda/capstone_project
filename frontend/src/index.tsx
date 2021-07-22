import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";

import "./style/main.scss";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Auth from "./components/Auth/Auth";

function main() {
  ReactDOM.render(
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/auth" component={Auth} />
    </BrowserRouter>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);