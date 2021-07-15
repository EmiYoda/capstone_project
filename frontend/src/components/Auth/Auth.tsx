import React, { useState } from 'react'

import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!) {
      register(options: {username: $username, password: $password}) {
          errors {
              field
              message
          }

          user {
              id
              username
          }
      }
  }
`;
const Auth = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [registerUser] = useMutation(REGISTER_USER);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log("submited")
        registerUser({ variables: { name, password } });
        console.log(registerUser)

    }

    return (
        <div className="auth">
            <h3 className={isSignup ? "auth__option" : "active"} onClick={() => setIsSignup(false)} >Sign In</h3>
            <h3 className={isSignup ? "active" : "auth__option"} onClick={() => setIsSignup(true)}>Sign Up</h3>
            <form autoComplete="off" className="auth__form" onSubmit={handleSubmit}>
                <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
                {/* {
                    isSignup ? <div className="auth__form__input">
                        <input type="email" required autoComplete="false" onChange={e => setEmail(e.target.value)} />
                        <label>Email</label>
                    </div> : null
                } */}
                <div className="auth__form__input">
                    <input type="name" required autoComplete="false" onChange={e => setName(e.target.value)} />
                    <label>Username</label>
                </div>
                <div className="auth__form__input">
                    <input type="password" required autoComplete="false" onChange={e => setPassword(e.target.value)} />
                    <label>Password</label>
                </div>
                <button type="submit" className="auth__form__btn">
                    {isSignup ? "Sign Up" : "Sign In"}
                </button>

            </form>
        </div>
    )
}

export default Auth
