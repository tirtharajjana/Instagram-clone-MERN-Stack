import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'

const NewPassword = () => {


    const [password, setPassword] = useState('');
    const { token } = useParams();
    console.log(token);
    const history = useHistory();

    const PostData = () => {

        fetch("/new-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, token })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                }
                else {

                    M.toast({ html: data.message, classes: "#00e676 green accent-3" });
                    history.push('/signin');
                }
            }).catch(err => console.log(err));


    }

    return (
        <div className='mycard ' >
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="password" placeholder="enter new password" onChange={e => setPassword(e.target.value)} value={password} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => PostData()} >Update Password</button>

            </div>
        </div>
    )
}

export default NewPassword
