import React, { useState, useEffect } from "react";

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
import { scene } from "./utils/DoubleBuffer";

function App() {
	const [display, setDisplay] = useState(Rooms);
	const [counter, setCounter] = useState(0);
	const [id, setId] = useState(false);

	const update = () => {
		const newDisplay = scene.getBuffer(display);
		setDisplay(newDisplay);
		let newCount = counter + 1;
		setCounter(newCount);
	};

	useEffect(() => {
		if (id === true) {
			setTimeout(update,1000/20)
		}
	}, [id, counter]);

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
					<button onClick={() => {setId(true)}}>Start</button>
					<button onClick={() => {setId(false)}}>Pause</button>
				</ButtonContainer>
			</div>
		</RoomContext.Provider>
	);
}

export default App;
