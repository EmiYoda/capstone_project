import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./Home";
import Navbar from "./Navbar";

const App = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      const response = await axios({
        url: "http://localhost:8000/api/user",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const content = await response;

      setName(content.data.name);
    })();
  });
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={() => <Home name={name} />} />
        <Route path="/login" component={() => <Login setName={setName} />} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
