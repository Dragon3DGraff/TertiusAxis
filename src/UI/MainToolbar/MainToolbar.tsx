import { CreatePrimitivesToolbar } from "../CreatePrimitivesToolbar/CreatePrimitivesToolbar";
import { Draggable } from "../Dragable/Draggable";
import styles from "./MainToolbar.module.css";

export const MainToolbar = () => {
  return (
    <Draggable startPosition={{ x: "0px", y: "25px" }}>
      <div className={styles.container}>
        MainToolbar
        <div>
          <button>Select</button>
          <button>Move</button>
          <button>Rotate</button>
          <button>Scale</button>
          <button>Drag</button>
        </div>
        <CreatePrimitivesToolbar />
        <div>Parameters</div>
        <div style={{ height: "300px" }}></div>
      </div>
    </Draggable>
  );
};
