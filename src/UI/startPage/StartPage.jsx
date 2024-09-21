import React from "react";

import logo from "../../_Resources/Logo/logo5.jpg";
import styles from "./StartPage.module.css";

console.log(styles);
export const StartPage = () => {
  return (
    <div className={styles.startPage}>
      <img src={logo} alt="Logo" />
      <h3>3D editor</h3>
    </div>
  );
};
