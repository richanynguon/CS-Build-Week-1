import React, { useEffect, useState } from "react";
import "./App.css";
import { Rooms } from "./data/data";
import StimulationWindow from "./components/StimulationWindow";
import {
	GameWindow,
	H1,
	PresetHolder,
	Preset,
	WindowBlocker,
	ButtonContainer,
	MainContainer,
} from "./appStyles";
import { RoomContext } from "./roomContext";

function App() {
	const applyRules = (allRooms, matrix) => {
		const zombie = allRooms.filter(
			(room) => room.getAllAlive() === 3 && !room.isAlive
		);
		const deathBed = allRooms.filter(
			(room) => room.getAllAlive() < 2 && room.isAlive
		);
		const overPop = allRooms.filter(
			(room) => room.getAllAlive() >= 4 && room.isAlive
		);
		deathBed.forEach((room) => {
			const { x, y } = room;
			matrix[y][x].isAlive = false;
		});
		overPop.forEach((room) => {
			const { x, y } = room;
			matrix[y][x].isAlive = false;
		});
		zombie.forEach((room) => {
			const { x, y } = room;
			matrix[y][x].isAlive = true;
		});
		return matrix;
	};

	const flattenMatrix = (matrix) => {
		let rooms = [];
		matrix.forEach((array, arrIdx) => {
			matrix.forEach((entry, entryIdx) => {
				rooms.push(matrix[arrIdx][entryIdx]);
			});
		});
		return rooms;
	};
	//matrixState, setMatrixState, matrix, list, views, setViews
	const [trigger, setTrigger] = useState(false);
	const [counter, setCounter] = useState(0);
	const [buffer, setBuffer] = useState([]);
	const [current, setCurrent] = useState({
		matrix: Rooms,
		list: flattenMatrix(Rooms),
	});
	const [intervalId, setIntervalId] = useState([]);

	useEffect(() => {}, [trigger, current, counter]);

	const updateView = (
		matrixState,
		setMatrixState,
		views,
		setViews,
		count,
		setCount
	) => {
		if (views.length < 0) {
			const newView = views.shift();
			setViews(views);
			setMatrixState({ ...matrixState, matrix: newView.matrix });
			const newCount = count + 1;
			setCount(newCount);
			console.log("count");
		}
	};

	const generateView = (matrix, list, views, setViews) => {
		if (views.length === 0) {
			const newView = applyRules(list, matrix);
			const newList = flattenMatrix(newView);
			const newViews = views.slice(0);
			newViews.push({ list: newList, matrix: newView });
			setViews(newViews);
		} else {
			const lastViewGenerated = views.slice(-1);
			const { matrix, list } = lastViewGenerated;
			const newView = applyRules(list, matrix);
			const newList = flattenMatrix(newView);
			const newViews = views.slice(0);
			newViews.push({ list: newList, matrix: newView });
			setViews(newViews);
		}
	};

	const startAnimation = (
		matrixState,
		setMatrixState,
		matrix,
		list,
		views,
		setViews,
		count,
		setCount,
		setInt
	) => {
		setCounter(0);
		const interval1 = setInterval(function () {
			updateView(matrixState, setMatrixState, views, setViews, count, setCount);
		}, 1000);
		const interval2 = setInterval(function () {
			generateView(matrix, list, views, setViews);
		}, 500);
		setInt([interval1, interval2]);
	};

	const clearAnimation = (int) => {
		clearInterval(int[0]);
		clearInterval(int[1]);
	};

	return (
		<RoomContext.Provider value={{ current, setCurrent }}>
			<div className='App'>
				<GameWindow>
					<MainContainer>
						<H1>Generation: {counter}</H1>
						<StimulationWindow />
						<WindowBlocker />
					</MainContainer>
					<PresetHolder>
						<Preset />
						<Preset />
						<Preset />
						<Preset />
					</PresetHolder>
				</GameWindow>
				<ButtonContainer>
					<button
						onClick={() => {
							const litRooms = current.list.filter((room) => room.isAlive);
							litRooms.forEach((room) => {
								const { x, y } = room;
								current.matrix[y][x].isAlive = false;
							});
							setTrigger(!trigger);
						}}>
						Clear
					</button>
					<button
						onClick={() => {
							applyRules(current.list, current.matrix);
							setTrigger(!trigger);
						}}>
						Next
					</button>
					<button
						onClick={() => {
							startAnimation(
								current,
								setCurrent,
								current.matrix,
								current.list,
								buffer,
								setBuffer,
								counter,
								setCounter,
								setIntervalId
							);
						}}>
						Start
					</button>
					<button
						onClick={() => {
							clearAnimation(intervalId);
						}}>
						Pause
					</button>
				</ButtonContainer>
			</div>
		</RoomContext.Provider>
	);
}

export default App;
