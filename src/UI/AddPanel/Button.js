import React from "react";
import "./addPanel_Buttons.css";
import PropTypes from "prop-types";

function Button({ name, setPanel }) {
  function btnClick() {
    setPanel(name);
  }
  return (
    <button className="addPanel_Buttons" onClick={btnClick}>
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  setPanel: PropTypes.func,
};

export default Button;
