import React, { useEffect, useState } from "react";

import { Tasks } from "./Tasks";
import Login from "./Login"
//create your first component
const Home = () => {
	const [loged, setLoged] = useState(false)
	const [user, setUser] = useState("")
	const [mostrar, setMostrar] = useState("")


	useEffect(
		() => {
			if (loged) {
				setMostrar(<Tasks setLoged={setLoged} user={user} setUser={setUser} />);
				return;
			};
			setMostrar(<Login setLoged={setLoged} setUser={setUser} />)
		},
		[user]
	)

	return (
		<>
			<header>
				<h3>To do List</h3>
			</header>
			<main id="tasks" className="container-fluid">
				{mostrar}
			</main>
			<footer>
				<p>© 2025 Company, Inc</p>
			</footer>
		</>
	);
};

export default Home;