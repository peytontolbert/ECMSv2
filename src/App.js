import React, { useState, useEffect, useCallback } from "react";
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css';

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardProjectManager from "./components/BoardProjectManager";
import BoardSystemManager from "./components/BoardSystemManager";
import BoardSpectator from "./components/BoardSpectator";

import { logout } from "./slices/auth";


import EventBus from "./common/EventBus";

const App = () => {
  const [showProjectManagerBoard, setShowProjectManagerBoard] = useState(false);
  const [showSystemManagerBoard, setShowSystemManagerBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [showSpectatorBoard, setShowSpectatorBoard] = useState(false);
  
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    const logOut = useCallback(() => {
      dispatch(logout());
    }, [dispatch]);
  
    useEffect(() => {
      if (currentUser) {
        setShowProjectManagerBoard(currentUser.roles.includes("PROJECT-MANAGER"));
        setShowSystemManagerBoard(currentUser.roles.includes("SYSTEM-MANAGER"));
      } else {
        setShowProjectManagerBoard(false);
        setShowSystemManagerBoard(false);
      }
  
      EventBus.on("logout", () => {
        logOut();
      });
  
      return () => {
        EventBus.remove("logout");
      };
    }, [currentUser, logOut]);
  return ( 
  <Router>
    <div className="background">
      <div className="form-shader">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showSystemManagerBoard && (
            <li className="nav-item">
              <Link to={"/systemmanager"} className="nav-link">
                System Manager Board
              </Link>
            </li>
          )}

          {showProjectManagerBoard && (
            <li className="nav-item">
              <Link to={"/projectmanager"} className="nav-link">
                Project Manager Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/spectator" element={<BoardSpectator />} />
          <Route path="/systemmanager" element={<BoardSystemManager />} />
          <Route path="/projectmanager" element={<BoardProjectManager />} />
        </Routes>
      </div>
    </div>
    </div>
  </Router>
);
};
export default App;
