import Navbar from "./components/Navbar";
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />

    </BrowserRouter>
  );
}

export default App;
