class FrameBuffer {
	constructor(matrixData) {
		this.data = matrixData;
		this.storage = [];
	}
	clear() {
		this.storage = [];
	}
	draw() {
		const units = this.prep();
		const matrix = this.data;
		const zombie = units.filter(
			(room) => room.getAllAlive() === 3 && !room.isAlive
		);
		const lonely = units.filter(
			(room) => room.getAllAlive() < 2 && room.isAlive
		);
		const noPrivacy = units.filter(
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
	prep() {
		let units = [];
		for (let arrayIdx = 0; arrayIdx < this.data.length; arrayIdx++) {
			for (
				let entryIdx = 0;
				entryIdx < this.data[arrayIdx].length;
				entryIdx++
			) {
				units.push(this.data[arrayIdx][entryIdx]);
			}
		}
		return units;
	}
}

export class Scene {
	constructor(data) {
		this.current = new FrameBuffer(data);
		this.next = new FrameBuffer(data);
	}
	display() {
		this.next.clear();
		this.next.draw();
		this.swap();
	}
	getBuffer() {
		this.display();
		return this.current.storage[0];
	}
	swap() {
		const temp = this.current;
		this.current = this.next;
		this.next = temp;
	}
}
