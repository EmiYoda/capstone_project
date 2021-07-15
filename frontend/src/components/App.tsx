import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const App = () => {
  return (
    <div className="app">
      <Link to="/auth">Auth</Link>
    </div>

  );
};

export default App;