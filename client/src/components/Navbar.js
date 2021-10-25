import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>
            ]
        } else {
            return [
                <li><Link to="/signin">Log in</Link></li>,
                <li><Link to="/signup">Sign up</Link></li>
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
