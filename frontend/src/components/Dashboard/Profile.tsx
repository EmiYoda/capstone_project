import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Profile = () => {
    const history = useHistory();
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    useEffect(() => {
        try {
            setToken(document.cookie.replace('token=', ''));
            const decoded = jwt_decode<any>(token);
            const { name, email, user_id, iat, exp } = decoded
            setUser(name)
        } catch (error) {
            console.log(error)
        }
    })

    const logout = async (e: any) => {
        e.preventDefault();
        try {
            document.cookie = `token= ; expires= expires=Thu, 01 Jan 1970 00:00:00 UTC;`
            history.push('/auth');

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="profile">

            <h1>{user}</h1>

            {
                token ? <button onClick={logout}>Log Out</button> : <button onClick={() => history.push('/auth')}>Log In / Register</button>
            }
        </div>
    )
}

export default Profile
