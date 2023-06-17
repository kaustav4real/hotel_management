import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import "./App.css";

//import Header from "./Components/Header/Header";
import HomePage from "./Pages/Home/Home";
import HostSigUpPage from "./Pages/HostSignUp/HostSignUp";
import Login from "./Pages/Auth/Login";
import NavigationMenu from "./Components/Navigation/NavigationMenu";
import Profile from "./Pages/Profile/Profile";
import TarinersHomePage from "./Pages/Trainers/TarinersHomePage";

function App() {
  const [user, setuser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setuser(data.user._json);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/*<Header />*/}
        <NavigationMenu
          auth={user ? true : false}
          imageSource={user ? user.picture : null}
          navigationStatus={user ? "displayItem" : "hideItem"}
        />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route
            path="/trainers"
            element={
              user ? (
                <TarinersHomePage email={user.email} ownerID={user.sub} />
              ) : (
                <Navigate to="/login" />
              )
            }
            exact
          />
          <Route
            exact
            path="/profile"
            element={
              user ? (
                <Profile
                  email={user.email}
                  imageSource={user.picture}
                  name={user.given_name}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/secrets" element={<h1>Secrets</h1>} exact />
          <Route
            path="/hostSignUp"
            element={user ? <HostSigUpPage /> : <Login />}
            exact
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
