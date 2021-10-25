import Navbar from "./components/Navbar";
import './App.css'
import React, { useEffect, createContext, useReducer, useContext } from 'react';

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import { reducre, initialState } from './reducres/userReducre'


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user })
      history.push('/');
    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/create" component={CreatePost} />
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
