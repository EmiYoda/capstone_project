import React, { useState } from "react";
import axios from "axios"

const Auth = () => {
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)
    const [data, setData] = useState(null);
    const register = () => {
        axios({
            method: "POST",
            data: {
                email: registerEmail,
                name: registerName,
                password: registerPassword,
            },
            url: "http://localhost:8000/api/register"
        }).then((res) => console.log(res))
    }

    const login = () => {
        axios({
            method: "POST",
            data: {
                email: loginEmail,
                password: loginPassword,
            },
            url: "http://localhost:8000/api/login"
        }).then((res) => console.log(res, setLoggedIn(true)))
    }
    return (
        <div className="auth">
            <div>
                <h1>Register</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setRegisterName(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <input
                    placeholder="email"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <button onClick={register}>Submit</button>
            </div>

            <div>
                <h1>Login</h1>
                <input
                    placeholder="email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>

            <div>
                {
                    loggedIn ? <h1>{loginEmail}</h1> : null
                }
            </div>
        </div>
    )
}

export default Auth
