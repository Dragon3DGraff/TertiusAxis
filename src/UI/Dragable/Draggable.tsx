import { PropsWithChildren, useEffect, useRef, useState } from "react";

import styles from "./Draggable.module.css";

type Props = {
  startPosition?: {
    x: string;
    y: string;
  };
};
export const Draggable = ({
  startPosition,
  children,
}: PropsWithChildren<Props>) => {
  const [dragModeEnabled, setDragMode] = useState(false);

  const [newPos, setNewPos] = useState(startPosition || { x: 0, y: 0 });
  const [clickPoint, setClickPoint] = useState({
    x: 0,
    y: 0,
    blockOffset: { x: 0, y: 0 },
  });
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dragModeEnabled) {
      document.addEventListener("mousemove", onMouseMove, false);
      document.addEventListener("pointerup", disableDragMode, false);
    } else {
      document.removeEventListener("mousemove", onMouseMove, false);
      document.removeEventListener("pointerup", disableDragMode, false);
    }
    return function cleanup() {
      document.removeEventListener("mousemove", onMouseMove, false);
      document.removeEventListener("pointerup", disableDragMode, false);
    };
  }, [dragModeEnabled]);

  function setPanelInvisible() {
    // props.setPanel("");
  }

  function enableDragMode(event: React.MouseEvent<HTMLDivElement>) {
    // if (event.buttons !== 1) return;
    if (!refContainer.current) {
      return;
    }
    let blockStyle = getComputedStyle(refContainer.current);
    console.log(blockStyle.left);
    console.log(blockStyle.top);
    let blockOffset = {
      x: Number.parseFloat(blockStyle.left.replace("px", "")),
      y: Number.parseFloat(blockStyle.top.replace("px", "")),
    };

    let point = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
      blockOffset: blockOffset,
    };
    setClickPoint(point);
    setDragMode(true);
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseMove(event: MouseEvent) {
    // if (
    //   event.pageX < 20 ||
    //   event.pageX > document.documentElement.clientWidth - 20 ||
    //   event.pageY < 20 ||
    //   event.pageY > document.documentElement.clientHeight - 20
    // ) {
    //   return;
    // }
    // if (event.buttons !== 1) {
    //   setDragMode(false);
    //   return;
    // }
    moveAt(event.pageX, event.pageY);
  }

  function moveAt(pageX: MouseEvent["pageX"], pageY: MouseEvent["pageY"]) {
    setNewPos({
      x: pageX - clickPoint.x - clickPoint.blockOffset.x + "px",
      y: pageY - clickPoint.y - clickPoint.blockOffset.y + "px",
    });
  }

  function disableDragMode() {
    setDragMode(false);
  }
  return (
    <div
      ref={refContainer}
      className={styles.container}
      onMouseDown={enableDragMode}
      style={{ left: newPos.x, top: newPos.y }}
    >
      {/* <div className={styles.dragLine}>
        <button className={styles.closeButton} onClick={setPanelInvisible}>
          X
        </button>
      </div> */}

      {children}
    </div>
  );
};
