import  { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TA_State } from "../../engine/TA_State.js";
import {EventEmitter} from "../../engine/EventEmitter.js";
import UserMenu from "../Personal/UserMenu.jsx";

import styles from "./Authentication.module.css";

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
        <span className={styles.authentication_link}>Login</span>
      </NavLink>
      <NavLink to="/registration">
        <span className={styles.authentication_link}>Registration</span>
      </NavLink>
    </div>
  );

  let loggedIn = (
    <div className={styles.authentication_welcome}>
      Welcome,
      <span onClick={showUsermenu} className="authentication-link">
        {ta_State.state.userName}
      </span>
    </div>
  );

  return (
    <div className={styles.auth_in_mainMenu}>
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
