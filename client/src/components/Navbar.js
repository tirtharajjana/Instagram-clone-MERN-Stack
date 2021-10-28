import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

const Navbar = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        // console.log(state);
        if (!state) {
            return [
                <li><Link to="/signin">Log in</Link></li>,
                <li><Link to="/signup">Sign up</Link></li>
            ]

        } else {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/myfollowingpost">My Following Posts</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li>
                    <button className="btn waves-effect waves-light #e53935 red darken-1"
                        onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" });
                            history.push('/signin')
                        }}>Logout</button>
                </li>
            ]
        }
    }

    return (
        <div >
            <nav>
                <div className="nav-wrapper white" >
                    <Link to={state ? '/' : '/signin'} className="brand-logo left">Instagram</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {renderList()}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
