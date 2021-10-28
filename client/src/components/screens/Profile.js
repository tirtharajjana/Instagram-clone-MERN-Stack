import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const [myPics, setMyPics] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    console.log(state);
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                setMyPics(result.myPost)
            })
    }, [])
    return (
        <div style={{ maxWidth: '550px', margin: '0 auto' }} >
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid grey" }}>
                <div >
                    <img style={{ width: "160px", height: "160px", borderRadius: "50%" }} alt='logo'
                        src={state ? state.pic : "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif    "}
                    />
                </div>
                <div>
                    <div>
                        <h4>{state ? state.name : "loading"}</h4>
                        <h5>{state ? state.email : "loading"}</h5>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h6>{myPics.length} posts</h6>
                            <h6>{state ? state.followers.length : "0"} followers</h6>
                            <h6>{state ? state.following.length : "0"} following</h6>
                        </div>

                    </div>
                </div>
            </div>
            <div className="gallery" >
                {
                    myPics.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile
