import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: "http://localhost:8000/api/register",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <form onSubmit={submit}>
      <h1>Sign Up</h1>

      <label htmlFor="inputName">Name</label>
      <input
        type="name"
        id="inputName"
        className="form__input"
        placeholder="Name"
        required
        autoFocus
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="inputEmail">Email</label>
      <input
        type="email"
        id="inputEmail"
        className="form__input"
        placeholder="Email Address"
        required
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="inputPassword">Password</label>
      <input
        type="password"
        id="inputPassword"
        className="form__input"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="auth__btn">
        Submit
      </button>
    </form>
  );
};

export default Register;
