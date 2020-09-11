import React, { useState, useContext, useMemo, useEffect } from 'react';
import './Matcap.css';

function MatcabCard(props) {

	const selectImage = (e) => {
		props.setImage( props.value );
	}

	return (
		<label className="MatcabCard" onClick = { selectImage }>		
			<input type = "radio"
			value = {props.value.name}
			name="MatcabCard">
			</input>
			<img className="cardImg" src={ props.value.img }></img>
		</label>
	);
}

export default MatcabCard;