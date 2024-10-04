/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { useContext, useState } from "react";

import logo from "../../_Resources/Logo/logo5.jpg";
import styles from "./StartPage.module.css";
// import AuthInMainMenu from "../Authentication/AuthInMainMenu";
import { EditorMode } from "../../engine/types";
import { TertiusAxisContext } from "../contexts/TertiusAxisContext";
import { UI } from "../UI";

type Props = {
  onStart: (mode: EditorMode) => void;
};
export const StartPage = ({ onStart }: Props) => {
  const editor = useContext(TertiusAxisContext);

  const onStartHandler = (mode: EditorMode) => {
    onStart(mode);
  };

  return editor ? (
    <UI mode={editor.mode} />
  ) : (
    <div className={styles.startPage}>
      <img src={logo} alt="Logo" />
      <button
        className={styles.startButton}
        onClick={() => onStartHandler(EditorMode["3D"])}
      >
        3D editor
      </button>
      <button
        className={styles.startButton}
        onClick={() => onStartHandler(EditorMode["2D"])}
      >
        2D editor
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
