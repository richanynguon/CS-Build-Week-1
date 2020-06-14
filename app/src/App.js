import React, { useEffect, useState } from "react";

import { Rooms , generateRooms} from "./data/data";
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
import { scene } from "./utils/DoubleBuffer";

function App() {
	const [display, setDisplay] = useState(Rooms.slice(0));
	const [counter, setCounter] = useState(0);
	const [start, setStart] = useState(false);
	const [intervalId, setIntervalId] = useState();
	const [counterId, setCounterID] = useState();

	const update = async () => {
		const displayCopy = await display.slice(0);
		const newDisplay = await scene.getBuffer(displayCopy);
		setDisplay(newDisplay)
		let newCount = counter + 1;
		await setCounter(newCount);
	};

	return (
		<RoomContext.Provider value={{ display, setDisplay }}>
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
							const newDisplay = scene.clearGrid();
							setDisplay(newDisplay);
							setCounter(0);
						}}>
						Clear
					</button>
					<button
						onClick={() => {
							update();
						}}>
						Next
					</button>
					<button
						onClick={() => {
							update();
						}}>
						Start
					</button>
					<button onClick={() => {}}>Pause</button>
				</ButtonContainer>
			</div>
		</RoomContext.Provider>
	);
}

export default App;
