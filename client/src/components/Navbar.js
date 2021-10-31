import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M, { Sidenav } from 'materialize-css'


const Navbar = () => {
    const searchModal = useRef(null);
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    const [search, setSearch] = useState('');
    const [userDetails, setUserDetails] = useState([])

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

    const fetchUsers = (query) => {
        setSearch(query);
        fetch("/search-users", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        }).then(res => res.json())
            .then(results => {
                setUserDetails(results.user);
            })
    }
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, Sidenav);
    });
    return (
        <>

            <nav>
                <div className="nav-wrapper white">
                    <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                    <ul id="nav-mobile" className="right">
                        {renderList()}

                    </ul>
                </div>

                {state &&
                    <div id="modal1" className="modal" ref={searchModal} >
                        <div className="modal-content">
                            <input type="text" placeholder="search users" onChange={e => fetchUsers(e.target.value)} value={search} />

                            <ul className="collection">
                                {userDetails.map(item => {
                                    return <Link key={item._id} to={(item._id !== state._id) ? `/profile/${item._id}` : '/profile'} onClick={() => {
                                        M.Modal.getInstance(searchModal.current).close();
                                        setUserDetails([]); setSearch("");
                                    }} > <li className="collection-item">{item.email}</li></Link>
                                })}

                            </ul>

                        </div>

                        <div className="modal-footer">
                            <button href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={() => { setUserDetails([]); setSearch("") }}>close</button>
                        </div>
                    </div>
                }
            </nav>
            <ul class="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>
        </>
    )
}

export default Navbar
