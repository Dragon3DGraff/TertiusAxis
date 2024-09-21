/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { useState } from "react";

import logo from "../../_Resources/Logo/logo5.jpg";
import styles from "./StartPage.module.css";
import AuthInMainMenu from "../Authentication/AuthInMainMenu";

type Props = {
  onStart: () => void;
};
export const StartPage = ({ onStart }: Props) => {
  const [isOpened, setIsOpened] = useState(true);

  const onClickHandler = () => {
    setIsOpened(false);
    onStart();
  };

  if (!isOpened) return <AuthInMainMenu />;

  return (
    <div className={styles.startPage}>
      <img src={logo} alt="Logo" />
      <button className={styles.startButton} onClick={onClickHandler}>
        3D editor
      </button>
      {/* <p>
        author
        <a
          href="https://dragon3dgraff.ru/en/%d0%be-%d0%bd%d0%b0%d1%81/"
          target="_blank"
          rel="noreferrer"
        >
          Dragon3DGraff
        </a>
      </p> */}
    </div>
  );
};
