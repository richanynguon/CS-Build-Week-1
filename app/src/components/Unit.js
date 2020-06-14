import React, { useEffect, useState, useContext } from "react";
import { UnitContainer } from "./styles";
import { RoomContext } from "../roomContext";

export default function Unit(info) {
	const { display } = useContext(RoomContext);
	const { isAlive, x, y } = info.info;
	const [invert, setInvert] = useState(false);

	useEffect(() => {}, [isAlive, invert]);
	return (
		<UnitContainer
			isAlive={isAlive}
			onClick={() => {
				display[y][x].isAlive = !display[y][x].isAlive;
				setInvert(!invert);
			}}></UnitContainer>
	);
}
