import React from "react";

import { Tasks } from "./Tasks";

//create your first component
const Home = () => {
	return (
		<>
			<header>
				 <h3>To do List</h3> 
			</header>
			<main id="tasks" className="container-fluid">
				<Tasks />
			</main>
				<footer>
					<p>© 2025 Company, Inc</p> 	
				</footer> 
		</>
	);
};

export default Home;