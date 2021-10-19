import React from 'react'

const Profile = () => {
    return (
        <div style={{ maxWidth: '550px', margin: '0 auto' }} >
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid grey" }}>
                <div >
                    <img style={{ width: "160px", height: "160px", borderRadius: "50%" }} alt='logo'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS522UPgHz758IciX31VWYyXQsiHkR1xfKg&usqp=CAU"
                    />
                </div>
                <div>
                    <h4>Tirtharaj Jana</h4>
                    <div style={{ display: 'flex', justifyContent: "space-between", width: "108%" }} >
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery" >
                <img className="item" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS522UPgHz758IciX31VWYyXQsiHkR1xfKg&usqp=CAU" />
                <img className="item" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS522UPgHz758IciX31VWYyXQsiHkR1xfKg&usqp=CAU" />
                <img className="item" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS522UPgHz758IciX31VWYyXQsiHkR1xfKg&usqp=CAU" />
                <img className="item" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS522UPgHz758IciX31VWYyXQsiHkR1xfKg&usqp=CAU" />
                <img className="item" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS522UPgHz758IciX31VWYyXQsiHkR1xfKg&usqp=CAU" />
                <img className="item" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS522UPgHz758IciX31VWYyXQsiHkR1xfKg&usqp=CAU" />
            </div>
        </div>
    )
}

export default Profile
