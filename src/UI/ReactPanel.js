import React, { useState, useEffect } from 'react';
import AddPanel from './AddPanel/AddPanel';
import MatcabCard from './AddPanel/MaterialsTab/Matcap/MatcabCard.js';
import { State } from '../State';

export const MatcapContext = React.createContext();

export default function ReactPanel(props) {

const matcabCards = props.matcapImages.cards_64.map( card =>
	<MatcabCard
		key= {card.name.toString()}
		value = { card }
		setImage = { setImage }
	/>
);

const cardsDiv = (
	<div className="MatCapImages">
		{matcabCards}
	</div>
)

let appState = new State();
const [selectedCard, setSelectedCard] = useState('');

useEffect( () => {
	appState.changeAppState( 'matcapChanged', selectedCard.src );
		}, [selectedCard] );

function setImage(img) {
	setSelectedCard(img)
}

return (
	<MatcapContext.Provider value={selectedCard} >
		<AddPanel cardsDiv={cardsDiv}></AddPanel>
	</MatcapContext.Provider>
	)
}