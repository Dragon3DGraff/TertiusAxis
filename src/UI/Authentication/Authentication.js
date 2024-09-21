import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styles from "./Authentication.module.css";
import Registration from "./Registration";
import Login from "./Login";

export default function Authentication({ history }) {
  const [hidden, setHidden] = useState(true);
  const hide = (val) => {
    setHidden(val);
  };

  return (
    <div
      className={styles.registration_mainMenu}
      style={hidden ? { height: "0px" } : { height: "100%" }}
    >
      <Switch>
        <Route
          path="/registration"
          render={(history) => <Registration hide={hide} {...history} />}
        />
        <Route
          path="/Login"
          render={(history) => <Login hide={hide} {...history} />}
        />
      </Switch>
    </div>
  );
}
