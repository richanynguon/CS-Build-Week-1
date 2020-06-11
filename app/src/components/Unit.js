import React, { useEffect, useState, useContext } from "react";
import { UnitContainer } from "./styles";
import { RoomContext } from "../roomContext";

export default function Unit(info) {
	const { current } = useContext(RoomContext);
	const { isAlive, x, y } = info.info;
	const [invert, setInvert] = useState(false);
	const { matrix } = current;
	useEffect(() => {}, [isAlive, invert]);
	return (
		<UnitContainer
			isAlive={isAlive}
			onClick={() => {
				matrix[y][x].isAlive = !matrix[y][x].isAlive;
				setInvert(!invert);
			}}></UnitContainer>
	);
}
