import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const PostData = () => {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            fetch("/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    }
                    else {
                        M.toast({ html: data.message, classes: "#00e676 green accent-3" })
                        history.push('/signin')
                    }
                }).catch(err => console.log(err));
        } else {
            M.toast({ html: "Invalid email", classes: "#e53935 red darken-1" })

        }

    }


    return (
        <div className='mycard ' >
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="name" onChange={e => setName(e.target.value)} value={name} />
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => PostData()} >Sign up </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup
