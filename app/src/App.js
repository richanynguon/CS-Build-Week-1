import React, { useEffect, useState } from "react";

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
import { Scene } from "./utils/DoubleBuffer";

function App() {
	const [display, setDisplay] = useState(Rooms);
	const [counter, setCounter] = useState(0);
	const scene = new Scene(display);

	useEffect(() => {}, []);

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
							setDisplay(Rooms);
						}}>
						Clear
					</button>
					<button onClick={() => {}}>Next</button>
					<button onClick={() => {}}>Start</button>
					<button onClick={() => {}}>Pause</button>
				</ButtonContainer>
			</div>
		</RoomContext.Provider>
	);
}

export default App;
