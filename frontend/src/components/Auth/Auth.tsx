import React, { useState } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";


const Auth = (props: any) => {
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [token, setToken] = useState(props.token);
    const history = useHistory();


    const register = async () => {
        try {
            const call = await axios({
                method: "POST",
                data: {
                    email: registerEmail,
                    name: registerName,
                    password: registerPassword,
                },
                url: "http://localhost:8000/api/register"
            })
            setToken(call.data.token);
            const expires = (new Date(Date.now() + 86400 * 1000)).toUTCString();
            document.cookie = `token=${token}; secure=true; samesite=lax; max-age=${expires + 86400}; http-only=true`;
            history.push('/dashboard');
        } catch (error) {
            console.log(error)
        }
    }

    const login = async () => {
        try {
            const call = await axios({
                method: "POST",
                data: {
                    email: loginEmail,
                    password: loginPassword,
                },
                url: "http://localhost:8000/api/login"
            })
            setToken(call.data.token);
            const expires = (new Date(Date.now() + 86400 * 1000)).toUTCString();
            document.cookie = `token=${token}; secure=true; samesite=lax; max-age=${expires + 86400}; http-only=true`;
            history.push('/dashboard');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth">
            <h3 className={isSignup ? "auth__option" : "active"} onClick={() => setIsSignup(false)} >Log In</h3>
            <h3 className={isSignup ? "active" : "auth__option"} onClick={() => setIsSignup(true)}>Register</h3>
            <form autoComplete="off" className="auth__form">
                {
                    isSignup ?
                        <div>
                            <input
                                placeholder="username"
                                onChange={(e) => setRegisterName(e.target.value)}
                            />
                            <input
                                placeholder="password"
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                            <input
                                className="auth__form__input"
                                placeholder="email"
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                            <button onClick={register}>Submit</button></div>

                        :

                        <div>

                            <div className="auth__form__input">
                                <input

                                    placeholder="email"
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="auth__form__input" >
                                <input
                                    placeholder="password"
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <button className="auth__form__btn" onClick={login}>Submit</button>
                        </div>
                }


            </form>
        </div>
    )
}

export default Auth
