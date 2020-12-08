import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TA_State } from "../../TA_State.js";
import EventEmitter from "../../EventEmitter.js";
import UserMenu from "../Personal/UserMenu.js";

let ta_State = new TA_State();

export default function AuthInMainMenu() {
  const [isAuth, setisAuth] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  useEffect(() => {
    let events = new EventEmitter();
    events.onEvent("auth", () => {
      setisAuth(ta_State.state.auth);
    });
  }, []);

  const showUsermenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  const unlogged = (
    <div>
      <NavLink to="/Login">
        <span className="authentication-link">Login</span>
      </NavLink>
      <NavLink to="/registration">
        <span className="authentication-link">Registration</span>
      </NavLink>
    </div>
  );

  let loggedIn = (
    <div className="authentication-welcome">
      Welcome,
      <span onClick={showUsermenu} className="authentication-link">
        {ta_State.state.userName}
      </span>
    </div>
  );

  return (
    <div className="auth-in-mainMenu">
      {isAuth ? loggedIn : unlogged}
      {isAuth && userMenuVisible && (
        <UserMenu
          userName={ta_State.state.userName}
          showUsermenu={showUsermenu}
        ></UserMenu>
      )}
    </div>
    //
  );
}
