import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UnitContainer } from "./styles";
import { Rooms } from "../data/data";

export default function Unit(info) {
	const { isAlive, id, x, y, n_to, s_to, e_to, w_to } = info.info;
	useEffect(() => {}, [isAcitve]);
	return (
		<UnitContainer
			isAlive={isAlive}
			onClick={() => {
				Rooms[x][y].isAlive = !Rooms[x][y].isAlive;
				console.log(Rooms[x][y].isAlive);
			}}></UnitContainer>
	);
}
