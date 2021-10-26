import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    // console.log(state);
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result.posts);
                setData(result.posts);
            })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: 'put',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                })
                setData(newData);
            }).catch(err => console.log(err))
    }

    const unlikePost = (id) => {
        fetch('/unlike', {
            method: 'put',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                })
                setData(newData);
            }).catch(err => console.log(err))
    }

    return (
        <div className="home" >
            {
                data.map((item) => {
                    return (
                        <div key={item._id} className="card home-card" >
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image" >
                                <img src={item.photo} alt="pic" />
                            </div>
                            <div className="card-content" >
                                <i className="material-icons">favorite</i>
                                {item.likes.includes(state._id)
                                    ? <i className="material-icons" style={{ color: "red" }} onClick={() => unlikePost(item._id)}>thumb_down</i>
                                    : <i className="material-icons" style={{ color: "red" }} onClick={() => likePost(item._id)} >thumb_up</i>
                                }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type='text' placeholder="Add comment" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home
