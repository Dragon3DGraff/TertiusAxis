import React, { useState } from 'react';
import "./addPanel_Buttons.css";

function Button ( props ){

	function btnClick( e ) {
		props.setPanel(props.name)
	}
	return (
		
			<button
			className="addPanel_Buttons"
			onClick= { btnClick }
			>{props.name}</button>
		
	)
}

export default Button;
