import React, { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client';


const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
      login(options: {username: $username, password: $password}) {
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

const ME = gql`
query Me {
    me{
    id
    username
    }
}
`

const Login = () => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [login] = useMutation(LOGIN_USER);
    const { loading, error, data } = useQuery(ME);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await login({ variables: { username: name, password: password } })
        console.log(response.errors)
        console.log("Logged in ");
        console.log(data)
    }
    return (
        <div className="auth">
            <h1 className="auth__title">Login</h1>
            <form autoComplete="off" className="auth__form" onSubmit={handleSubmit} >
                <div className="auth__form__input">
                    <input type="name" required autoComplete="false" onChange={e => setName(e.target.value)} />
                    <label>Username</label>
                </div>

                <div className="auth__form__input">
                    <input type="password" required autoComplete="false" onChange={e => setPassword(e.target.value)} />
                    <label>Password</label>
                </div>

                <button type="submit" className="auth__form__btn">
                    Log In
                </button>
            </form>
        </div>
    )
}

export default Login
