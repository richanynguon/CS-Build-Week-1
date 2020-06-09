import React from "react";
import { Rooms } from "../data/data";
import { WindowContainer } from "./styles";
import Row from "./Row";

export default function StimulationWindow() {

	return (
		<WindowContainer>
			{Rooms.map((array) => {
				return <Row array={array} />;
			})}
		</WindowContainer>
	);
}
