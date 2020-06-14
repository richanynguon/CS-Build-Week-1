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

export class Room {
	constructor(
		id,
		x,
		y,
		isAlive = false,
		n_to = null,
		s_to = null,
		e_to = null,
		w_to = null,
		ne_to = null,
		nw_to = null,
		se_to = null,
		sw_to = null
	) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.isAlive = isAlive;
		this.n_to = n_to;
		this.s_to = s_to;
		this.e_to = e_to;
		this.w_to = w_to;
		this.ne_to = ne_to;
		this.nw_to = nw_to;
		this.se_to = se_to;
		this.sw_to = sw_to;
	}

	connectRoom(room, dir) {
		this[`${dir}_to`] = room;
	}
	getAllAlive() {
		let alive = [];
		if (this.n_to) {
			if (this.n_to.isAlive) {
				alive.push({ n: this.n_to.id });
			}
		}
		if (this.s_to) {
			if (this.s_to.isAlive) {
				alive.push({ s: this.s_to.id });
			}
		}
		if (this.e_to) {
			if (this.e_to.isAlive) {
				alive.push({ e: this.e_to.id });
			}
		}
		if (this.w_to) {
			if (this.w_to.isAlive) {
				alive.push({ w: this.w_to.id });
			}
		}
		if (this.nw_to) {
			if (this.nw_to.isAlive) {
				alive.push({ nw: this.nw_to.id });
			}
		}
		if (this.sw_to) {
			if (this.sw_to.isAlive) {
				alive.push({ sw: this.sw_to.id });
			}
		}
		if (this.se_to) {
			if (this.se_to.isAlive) {
				alive.push({ se: this.se_to.id });
			}
		}
		if (this.ne_to) {
			if (this.ne_to.isAlive) {
				alive.push({ ne: this.ne_to.id });
			}
		}

		return alive.length;
	}
}

function connectRooms(grid, nByN, roomsAmount) {
	let rooms = [];
	let roomCount = 0;
	grid.forEach((array, arrIdx) => {
		grid.forEach((entry, entryIdx) => {
			rooms.push(grid[arrIdx][entryIdx]);
		});
	});
	for (const [idx, value] of rooms.entries()) {
		if (idx + nByN < roomsAmount) {
			rooms[idx].connectRoom(rooms[idx + nByN], "s");
		}
		if (idx - nByN >= 0) {
			rooms[idx].connectRoom(rooms[idx - nByN], "n");
		}
		if (idx % nByN < nByN - 1 && idx + 1 - nByN >= 0) {
			rooms[idx].connectRoom(rooms[idx - nByN + 1], "ne");
		}
		if (idx % nByN < nByN - 1 && idx + 1 + nByN < roomsAmount) {
			rooms[idx].connectRoom(rooms[idx + nByN + 1], "se");
		}
		if (idx % nByN < nByN - 1) {
			rooms[idx].connectRoom(rooms[idx + 1], "e");
		}
		if ((idx % nByN) - 1 > 0 && idx + 1 - nByN >= 0) {
			rooms[idx].connectRoom(rooms[idx - nByN - 1], "nw");
		}
		if ((idx % nByN) - 1 > 0 && idx + 1 + nByN < roomsAmount) {
			rooms[idx].connectRoom(rooms[idx + nByN - 1], "sw");
		}
		if (idx % nByN > 0) {
			rooms[idx].connectRoom(rooms[idx - 1], "w");
		}
		const xCoord = roomCount % nByN;
		const yCoord = Math.floor(roomCount / nByN);
		grid[yCoord][xCoord] = value;
		roomCount += 1;
	}
}

export function generateRooms(nByN) {
	const grid = Array(nByN).fill(null);
	const roomsAmount = nByN ** 2;
	let roomCount = 0;
	grid.forEach((item, idx) => {
		grid[idx] = Array(nByN).fill(null);
	});

	while (roomCount < roomsAmount) {
		const xCoord = roomCount % nByN;
		const yCoord = Math.floor(roomCount / nByN);
		const roomId = roomCount;
		grid[yCoord][xCoord] = new Room(roomId, xCoord, yCoord);
		roomCount += 1;
	}
	connectRooms(grid, nByN, roomsAmount);
	return grid;
}

export const Rooms = generateRooms(10);
