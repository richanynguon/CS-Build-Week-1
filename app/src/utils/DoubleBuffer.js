import { Rooms, generateRooms, Room } from "../data/data";

class FrameBuffer {
	constructor() {
		this.storage = [];
	}
	clear() {
		this.storage = [];
	}
	draw(inputData) {
		const matrix = generateRooms(10);
		const units = this.prep(inputData);
		const newUnits = this.prep(matrix);
		this.copy(newUnits, units);
		const zombie = newUnits.filter(
			(room) => room.getAllAlive() === 3 && !room.isAlive
		);
		const lonely = newUnits.filter(
			(room) => room.getAllAlive() < 2 && room.isAlive
		);
		const noPrivacy = newUnits.filter(
			(room) => room.getAllAlive() >= 4 && room.isAlive
		);
		lonely.forEach((room) => {
			const { x, y } = room;
			matrix[y][x].isAlive = false;
		});
		noPrivacy.forEach((room) => {
			const { x, y } = room;
			matrix[y][x].isAlive = false;
		});
		zombie.forEach((room) => {
			const { x, y } = room;
			matrix[y][x].isAlive = true;
		});
		this.storage = matrix;
	}
	copy(newUnits, oldUnits) {
		oldUnits.forEach(
			(element, idx) =>
				(newUnits[idx] = new Room(
					element.id,
					element.x,
					element.y,
					element.isAlive,
					element.n_to,
					element.s_to,
					element.e_to,
					element.w_to,
					element.ne_to,
					element.nw_to,
					element.se_to,
					element.sw_to
				))
		);
	}
	prep(inputData) {
		let units = [];
		for (let arrayIdx = 0; arrayIdx < inputData.length; arrayIdx++) {
			for (
				let entryIdx = 0;
				entryIdx < inputData[arrayIdx].length;
				entryIdx++
			) {
				units.push(inputData[arrayIdx][entryIdx]);
			}
		}
		return units;
	}
}

class Scene {
	constructor() {
		this.current = new FrameBuffer();
		this.next = new FrameBuffer();
	}
	display(inputData) {
		this.next.clear();
		this.next.draw(inputData);
		this.swap();
	}
	getBuffer(inputData) {
		this.display(inputData);
		return this.current.storage;
	}
	swap() {
		const temp = this.current;
		this.current = this.next;
		this.next = temp;
	}
	clearGrid() {
		this.display(generateRooms(10));
		return this.current.storage;
	}
}

export const scene = new Scene();
