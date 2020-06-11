import React, { useContext } from "react";
import { WindowContainer } from "./styles";
import Row from "./Row";
import { RoomContext } from "../roomContext";
export default function StimulationWindow() {
	const { current } = useContext(RoomContext);
	return (
		<WindowContainer>
			{current.matrix.map((array, idx) => {
				return <Row key={`${idx << 3}`} array={array} />;
			})}
		</WindowContainer>
	);
}
