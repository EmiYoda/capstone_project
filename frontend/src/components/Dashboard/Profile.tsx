import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
    // const user = () => {
    //     axios({
    //         method: "POST",
    //         headers: {
    //             "x-access-token": `${}`
    //         }
    //     })
    // }


    return (
        <div className="profile">
            {document.cookie.slice(4, 4)}
        </div>
    )
}

export default Profile
