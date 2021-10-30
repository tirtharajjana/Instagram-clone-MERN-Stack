import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState(undefined)
    const history = useHistory();
    useEffect(() => {
        if (url) {
            uploadFields();
        }
    }, [url])
    const uploadPic = () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'insta-clone');
        data.append('cloud_name', 'tirtharaj');

        fetch('https://api.cloudinary.com/v1_1/tirtharaj/image/upload', {
            method: 'post',
            body: data
        })
            .then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err))



    }

    const uploadFields = () => {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            fetch("/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, pic: url })
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
    const PostData = () => {
        if (image) {
            uploadPic();
        } else {
            uploadFields();
        }


    }


    return (
        <div className='mycard ' >
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="name" onChange={e => setName(e.target.value)} value={name} />
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-2">
                        <span>Upload pic</span>
                        <input type="file" onChange={e => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one image" />
                    </div>

                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => PostData()} >Sign up </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
                <h5>
                    <Link to="/reset">Forget password</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup
