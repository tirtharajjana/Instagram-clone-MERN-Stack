import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'


const Navbar = () => {
    const searchModal = useRef(null);
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    const [search, setSearch] = useState('')
    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])

    const renderList = () => {
        // console.log(state);
        if (!state) {
            return [
                <li key="1" ><Link to="/signin">Log in</Link></li>,
                <li key="2" ><Link to="/signup">Sign up</Link></li>
            ]

        } else {
            return [
                <li key="1" ><i className="large material-icons modal-trigger" style={{ color: "black" }} data-target="modal1" >search</i></li>,
                <li key="2" ><Link to="/profile">Profile</Link></li>,
                <li key="3" ><Link to="/myfollowingpost">My Following Posts</Link></li>,
                <li key="4" ><Link to="/create">Create Post</Link></li>,
                <li key="5" >
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
        <>
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
            <div id="modal1" className="modal" ref={searchModal} >
                <div className="modal-content">
                    <input type="text" placeholder="search users" onChange={e => setSearch(e.target.value)} value={search} />

                    <ul className="collection">
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                    </ul>

                </div>
                <div className="modal-footer">
                    <button href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</button>
                </div>
            </div>
        </>
    )
}

export default Navbar
