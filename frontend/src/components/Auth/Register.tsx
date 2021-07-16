import React, { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client';


const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!) {
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
const ME = gql`
query Me {
    me{
    id
    username
    }
}
`

const Register = () => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [register] = useMutation(REGISTER_USER);
    const { loading, error, data } = useQuery(ME);

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await register({ variables: { username: name, password: password } })
        console.log(response.errors)
        console.log("Registered Succesfully")
        console.log(data);
    }
    return (
        <div className="auth">
            <h1 className="auth__title">Register</h1>
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
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
