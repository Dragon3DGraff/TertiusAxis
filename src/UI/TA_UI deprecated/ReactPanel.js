import React, { useState, useEffect } from "react";
import AddPanel from "../AddPanel/AddPanel.js";
import MatcabCard from "../AddPanel/MaterialsTab/Matcap/MatcabCard.js";

import DebuggingPanel from "./DebuggingPanel.js";
import { TA_State } from "../../engine/TA_State.js";

export const MatcapContext = React.createContext();

export default function ReactPanel(props) {
  const matcabCards = props.matcapImages.cards_64.map((card) => (
    <MatcabCard key={card.name.toString()} value={card} setImage={setImage} />
  ));

  const cardsDiv = <div className="MatCapImages">{matcabCards}</div>;

  let ta_State = new TA_State();
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    ta_State.changeAppState("matcapChanged", selectedCard.src);
  }, [selectedCard]);

  function setImage(img) {
    setSelectedCard(img);
  }

  return (
    <MatcapContext.Provider value={selectedCard}>
      <AddPanel cardsDiv={cardsDiv}></AddPanel>
      <DebuggingPanel></DebuggingPanel>
    </MatcapContext.Provider>
  );
}
