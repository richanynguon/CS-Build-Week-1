import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UnitContainer } from "./styles";
import { Rooms } from "../data/data";

export default function Unit(info) {
	const { isAlive, id, x, y } = info.info;
	const [invert, setInvert] = useState(false);
	useEffect(() => {}, [isAlive, invert]);
	return (
		<UnitContainer
			isAlive={isAlive}
			onClick={() => {
				Rooms[y][x].isAlive = !Rooms[y][x].isAlive;
				setInvert(Rooms[y][x].isAlive);
			}}>

		</UnitContainer>
	);
}
