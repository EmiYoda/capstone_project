import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
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

  const logout = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8000/api/logout",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    setName("");
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Home
        </Link>

        <div>
          {name ? (
            <>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              {" "}
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
