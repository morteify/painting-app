export class Canvas {

	constructor(width, height) {
		this.width = width
		this.height = height
	}

	createCanvas() {
		const canvas = document.createElement('canvas')
		canvas.width = this.width
		canvas.height = this.height
		const ctx = canvas.getContext('2d')
		return canvas
	}
}