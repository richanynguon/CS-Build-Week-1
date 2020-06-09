import styled from "styled-components";

export const UnitContainer = styled.button`
	height: 10px;
	width: 10px;
	background: ${(props) => (props.isAlive ? "red" : "white")};
	border: 0.1px gray solid;
`;

export const WindowContainer = styled.div`
	width: 100px;
	height: 100px;
`;

export const RowContainer = styled.div`
	display: flex;
`;
