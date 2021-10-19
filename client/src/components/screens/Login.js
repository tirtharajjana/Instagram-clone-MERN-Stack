import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='mycard ' >
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button class="btn waves-effect waves-light #64b5f6 blue lighten-2">Login

                </button>
                <h5>
                    <Link to="/signup">Don't have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login
