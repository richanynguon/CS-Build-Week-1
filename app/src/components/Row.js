import React, { useEffect, useState } from "react";
import Unit from "./Unit";
import { RowContainer } from "./styles";

export default function Row(array) {
	const [elements, setElements] = useState([]);
	useEffect(() => {
		setElements(array.array);
	}, [array]);
	return (
		<RowContainer>
			{elements.map((unit) => (
				<Unit info={unit}/>
			))}
		</RowContainer>
	);
}
