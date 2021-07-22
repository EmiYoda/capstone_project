import React, { useState } from "react";
import axios from "axios"

const Auth = () => {
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);
    const register = () => {
        axios({
            method: "POST",
            data: {
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
                name: loginName,
                password: loginPassword,
            },
            url: "http://localhost:8000/api/login"
        }).then((res) => console.log(res))
    }

    // const getUser = () => {
    //     axios({
    //         method: "POST",
    //         data: {
    //             name: loginName,
    //             password: loginPassword,
    //         },
    //         url: "http://localhost:8000/api/login"
    //     }).then((res) => console.log(res))
    // }
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
                <button onClick={register}>Submit</button>
            </div>

            <div>
                <h1>Login</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setLoginName(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>

            {/* <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {data ? <h1>Welcome Back {data.username}</h1> : null}
            </div> */}
        </div>
    )
}

export default Auth
