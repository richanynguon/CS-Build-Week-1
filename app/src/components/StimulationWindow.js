import React, { useContext } from "react";
import { WindowContainer } from "./styles";
import Row from "./Row";
import { RoomContext } from "../roomContext";
export default function StimulationWindow() {
	const { display } = useContext(RoomContext);
	return (
		<WindowContainer>
			{display.map((array, idx) => {
				return <Row key={`${idx << 3}`} array={array} />;
			})}
		</WindowContainer>
	);
}
