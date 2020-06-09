/*

generate world
generate a matrix with 10 rows of 10 elements
each element I want to have a state whether its dead or alive
to general all neighbors it needs to check all neghbors state at every "next step"

{
  id: room#
  state: alive or dead
  n_to:
  s_to:
  e_to:
  w_to:
}

*/

class Room {
	constructor(
		id,
		x,
		y,
		isAlive = false,
		n_to = null,
		s_to = null,
		e_to = null,
		w_to = null,
	) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.isAlive = isAlive;
		this.n_to = n_to;
		this.s_to = s_to;
		this.e_to = e_to;
		this.w_to = w_to;
	}
}

function generateMap(nByN) {
	const grid = Array(nByN).fill(null);
	const width = nByN;
	const height = nByN;
	const roomsAmount = nByN ** 2;
	let roomCount = 0;
	for (i in grid) {
		grid[i] = Array(nByN).fill(null);
	}
	while (roomCount < roomsAmount) {
		const xCoord = roomCount % width;
		const yCoord = Math.floor(roomCount / width);
		const roomId = roomCount;
		grid[yCoord][xCoord] = new Room( roomId, xCoord, yCoord);
		roomCount += 1;
	}
	console.log(grid);
}

generateMap(10);
