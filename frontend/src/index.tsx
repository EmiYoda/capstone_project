import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";

import "./style/main.scss";
import Auth from "./components/Auth/Auth";

function main() {
  ReactDOM.render(
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/auth" component={Auth} />
    </BrowserRouter>,
    document.getElementById("root")
  );
}

document.addEventListener("DOMContentLoaded", main);