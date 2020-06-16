import styled from "styled-components";

export const UnitContainer = styled.button`
	height: 20px;
	width: 20px;
	background: ${(props) => (props.isAlive ? "red" : "white")};
	border: 0.1px gray solid;
	text-align: center;
`;

export const WindowContainer = styled.div`

`;

export const RowContainer = styled.div`
	display: flex;
`;
