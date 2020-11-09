import React, {useEffect, useRef} from 'react';
import './UserMenu.css';
import {TA_State} from '../../TA_State.js';
import {Http} from '../../Http.js';

let ta_State = new TA_State();
const http = new Http(ta_State);

export default function UserMenu ({userName, showUsermenu}) {
	const formRef = useRef(null);

	function onMouseleave() {
		showUsermenu()
	}

	const logout = async () => {
		await http.logout();
		showUsermenu();
	}
	
	useEffect( () => {
		formRef.current.addEventListener('mouseleave', onMouseleave)

		return () => {formRef.current.removeEventListener('mouseleave', onMouseleave)};

	},[])

	return (
		<div ref={formRef} className="UserMenu-div">

			<ul>{userName}
				<li>
					Profile
				</li>
				<li>
					Scenes
				</li>
				<li>
					Settings
				</li>
				___________
				<li>
					<span className="UserMenu-logout" onClick={logout}>Logout</span>
				</li>
			</ul>
		</div>
	)
}