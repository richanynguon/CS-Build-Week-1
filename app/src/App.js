import React, { useEffect, useState } from "react";
import "./App.css";
import { Rooms } from "./data/data";
import StimulationWindow from "./components/StimulationWindow";

function App() {
	const [allRooms, setAllRooms] = useState([]);
	const [trigger, setTrigger] = useState([]);
	useEffect(() => {
		let rooms = [];
		Rooms.forEach((array, arrIdx) => {
			Rooms.forEach((entry, entryIdx) => {
				rooms.push(Rooms[arrIdx][entryIdx]);
			});
		});
		setAllRooms(rooms);
		setTrigger(Rooms);
	}, [trigger]);
	return (
		<div className='App'>
			<StimulationWindow />
			<button
				onClick={() => {
					const zombie = allRooms.filter(
						(room) => room.getAllAlive() == 3 && !room.isAlive
					);
					const deathBed = allRooms.filter(
						(room) => room.getAllAlive() < 2 && room.isAlive
					);
					const overPop = allRooms.filter(
						(room) => room.getAllAlive() >= 4 && room.isAlive
					);
					deathBed.forEach((room) => {
						const { x, y } = room;
						Rooms[y][x].isAlive = false;
					});
					overPop.forEach((room) => {
						const { x, y } = room;
						Rooms[y][x].isAlive = false;
					});
					zombie.forEach((room) => {
						const { x, y } = room;
						Rooms[y][x].isAlive = true;
					});
					setTrigger(deathBed);
				}}>
				Next
			</button>
		</div>
	);
}

export default App;
