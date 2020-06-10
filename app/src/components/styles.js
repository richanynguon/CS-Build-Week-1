import styled from "styled-components";

export const UnitContainer = styled.button`
	height: 30px;
	width: 30px;
	background: ${(props) => (props.isAlive ? "red" : "white")};
	border: 0.1px gray solid;
	text-align: center;
`;

export const WindowContainer = styled.div`
	width: 300px;
	height: 300px;
`;

export const RowContainer = styled.div`
	display: flex;
`;
