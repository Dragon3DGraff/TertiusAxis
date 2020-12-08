import React, { useState, useEffect } from "react";
import "./AddPanel.css";
import Button from "./Button";
import Matcap from "./MaterialsTab/Matcap/Matcap";
import PropTypes from "prop-types";
function AddPanel(props) {
  const buttons = ["MatCaps", "Textures", "Models"];

  const [panel, setPanel] = useState("");
  const [cardsDiv, setCardsDiv] = useState(null);

  useEffect(() => {
    setCardsDiv(props.cardsDiv);
  }, []);

  return (
    <div className="Main">
      {buttons.map((btn) => (
        <Button name={btn} key={btn} setPanel={setPanel} />
      ))}
      {panel && (
        <Matcap setPanel={setPanel} panel={panel} cardsDiv={cardsDiv} />
      )}
      {/* {panel === 'Textures' && <TexturesTab setPanel = { setPanel }/>} */}
    </div>
  );
}

AddPanel.propTypes = {
  cardsDiv: PropTypes.element,
};

export default AddPanel;
