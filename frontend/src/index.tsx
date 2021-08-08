import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";
import "./style/main.scss";
import Auth from "./components/Auth/Auth";
import Profile from './components/Dashboard/Profile';
import NewPost from './components/Uploads/NewPost';
import Post from './components/Uploads/Post';


function main() {
  ReactDOM.render(
    <BrowserRouter>
      <Route path="/" exact component={document.cookie.replace('token=', '') !== '' || null || undefined ? App : Auth} />
      <Route path="/dashboard" component={Profile} />
      <Route path="/edit/:slug" component={NewPost} />
      <Route path="/new/post" component={NewPost} />
      <Route path="/post/:slug" component={Post} />
    </BrowserRouter>,
    document.getElementById("root")
  );
}

document.addEventListener("DOMContentLoaded", main);