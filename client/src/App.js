import Navbar from "./components/Navbar";
import './App.css'
import React, { useEffect, createContext, useReducer, useContext } from 'react';

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import { reducre, initialState } from './reducres/userReducre'
import SubscribedUserPosts from "./components/screens/SubscribedUserPosts";


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user })
      // history.push('/');
    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/create" component={CreatePost} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route path="/myfollowingpost" component={SubscribedUserPosts} />
    </Switch>
  )
}

function App() {


  const [state, dispatch] = useReducer(reducre, initialState)

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ state, dispatch }} >
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
