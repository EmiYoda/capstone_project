import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";

import "./style/main.scss";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const link = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  credentials: 'include',
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),


});


import Auth from "./components/Auth/Auth";

function main() {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route path="/" exact component={App} />
        <Route path="/auth" component={Auth} />
      </BrowserRouter>
    </ApolloProvider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);