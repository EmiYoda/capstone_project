import React, { useState } from 'react'
const Login = () => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    return (
        <div className="auth">
            <h1 className="auth__title">Login</h1>
            <form autoComplete="off" className="auth__form" >
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
