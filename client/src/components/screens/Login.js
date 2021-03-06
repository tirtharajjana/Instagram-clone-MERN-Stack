import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'


const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const PostData = () => {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            fetch("/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    }
                    else {
                        localStorage.setItem("jwt", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                        dispatch({ type: "USER", payload: data.user });
                        M.toast({ html: "Signedin successfully", classes: "#00e676 green accent-3" });
                        history.push('/');
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
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => PostData()} >Login</button>
                <h5>
                    <Link to="/signup">Don't have an account ?</Link>
                </h5>
                <h5>
                    <Link to="/reset">Forget password</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login
