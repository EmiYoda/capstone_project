import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Login = (props: { setName: (name: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await axios({
      method: "post",
      url: "http://localhost:8000/api/login",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: JSON.stringify({
        email,
        password,
      }),
    });

    const content = await response;
    props.setName(content.data.name);

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={submit}>
      <h1>Sign In</h1>
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

export default Login;
