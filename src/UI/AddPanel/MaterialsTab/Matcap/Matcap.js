import React, { useState, useEffect, useContext } from "react";
import "./Matcap.css";
import { MatcapContext } from "../../../ReactPanel";
import { TA_State } from "../../../../engine/TA_State";


let headers = {
  MatCaps: "Select Matcap",
  Textures: "Select Texture",
  Models: "Select Model",
};

function Matcap(props) {
  const [dragModeEnabled, setDragMode] = useState(false);
  const [newX, setNewX] = useState("0px");
  const [newY, setNewY] = useState("30px");
  const [cardsDiv, setCardsDiv] = useState(null);
  const [clickPoint, setClickPoint] = useState({ x: undefined, y: undefined });
  const selectedCard = useContext(MatcapContext);
  let ta_State = new TA_State();

  useEffect(() => {
    if (dragModeEnabled) {
      document.addEventListener("mousemove", onMouseMove, false);
    }
    return function cleanup() {
      document.removeEventListener("mousemove", onMouseMove, false);
    };
  }, [dragModeEnabled]);

  useEffect(() => {
    setCardsDiv(props.cardsDiv);
  }, []);

  function clickUseButton() {
    ta_State.changeAppState("matcapChanged", selectedCard.src);
  }

  function changeCheckbox(e) {
    console.log("changeCheckbox", e.target.checked);
  }

  function setPanelInvisible() {
    props.setPanel("");
  }

  function enableDragMode() {
    if (event.buttons !== 1) return;
    let blockStyle = getComputedStyle(event.target.parentNode.parentNode);
    let blockOffset = {
      x: blockStyle.left.replace("px", ""),
      y: blockStyle.top.replace("px", ""),
    };
    let point = {
      x: event.offsetX,
      y: event.offsetY,
      blockOffset: blockOffset,
    };
    setClickPoint(point);
    setDragMode(true);
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseMove() {
    if (
      event.pageX < 20 ||
      event.pageX > document.documentElement.clientWidth - 20 ||
      event.pageY < 20 ||
      event.pageY > document.documentElement.clientHeight - 20
    ) {
      return;
    }
    if (event.buttons !== 1) {
      setDragMode(false);
      return;
    }
    moveAt(event.pageX, event.pageY);
  }

  function moveAt(pageX, pageY) {
    setNewX(pageX - clickPoint.x - clickPoint.blockOffset.x + "px");
    setNewY(pageY - clickPoint.y - clickPoint.blockOffset.y + "px");
  }

  function disableDragMode() {
    setDragMode(false);
  }

  return (
    <div
      className="MatCap"
      onMouseUp={disableDragMode}
      style={{ left: newX, top: newY }}
    >
      <div className="dragLine" onMouseDown={enableDragMode}>
        {headers[props.panel]}
        <button className="addPanel_CloseButton" onClick={setPanelInvisible}>
          X
        </button>
      </div>
      <div className="HeadMatCab">
        <div className="matCapPreview">
          {props.panel === "MatCaps" && selectedCard.img ? (
            <img className="cardImgSelected" src={selectedCard.img}></img>
          ) : (
            ""
          )}
        </div>
        <div className="HeadMatCabButtons">
          <label>
            Preview
            <input type="checkbox" name="checkbox" onChange={changeCheckbox} />
          </label>
          <button className="addPanel_Buttons" onClick={clickUseButton}>
            Use
          </button>
        </div>
      </div>
      {props.panel === "MatCaps" && cardsDiv}
    </div>
  );
}

export default Matcap;
