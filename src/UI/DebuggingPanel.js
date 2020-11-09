import React, { useState, useEffect } from "react";
import './DebuggingPanel.css';
import { TA_State } from '../TA_State';
import EventEmitter from '../EventEmitter';

let eventEmitter = new EventEmitter();
let ta_State = new TA_State();


export default function DebuggingPanel (props) {
	
	const [state, setState] = useState('');
	const [appStates, setAppStates] = useState('');


	useEffect(()=>{
		const appStatesArr = []
		for (const key in ta_State.state) {
				if (ta_State.state.hasOwnProperty(key)) {
					appStatesArr.push(<p key={key}>{key} -- {String(ta_State.state[key])}</p>)
				}
			}
		setAppStates( appStatesArr);
	 }, [state])

	//  useEffect( ()=> {console.log('rendered')})

	eventEmitter.onEvent("appStateChanged", update );

	function update(mode) {
		setState(mode);
	}

	return (
		<div className='DebuggingPanel'>
			<h3>Debug panel </h3>
			<p className='appStateChanged'>appStateChanged:</p>
			<p>{state}</p>
			<hr />

			{appStates}	
			</div>
	)
}