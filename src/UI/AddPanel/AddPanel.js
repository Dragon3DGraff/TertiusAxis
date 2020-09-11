import React, { useState, useEffect, useMemo } from 'react';
import "./AddPanel.css";
import Button from "./Button";
import Matcap from "./MaterialsTab/Matcap/Matcap";

function AddPanel ( props ) {

	const buttons = [
		'MatCaps',
		'Textures',
		'Models'
	];

	const [ panel, setPanel ] = useState('');
	const [ cardsDiv, setCardsDiv ] = useState(null);

	useEffect( () => {
		setCardsDiv( props.cardsDiv );
	}, [] )

	function getButtonName( e ) {
		setPanel(e.target.name );
	}

	return(
		<div className="Main">
			{ buttons.map( (btn) =>
				<Button
					name= {btn}
					key= {btn}
					setPanel = { setPanel }
				/>)
			}
			{panel && <Matcap setPanel = { setPanel } panel = {panel} cardsDiv={cardsDiv} />}
			{/* {panel === 'Textures' && <TexturesTab setPanel = { setPanel }/>} */}
		</div>
	)
}

export default AddPanel;