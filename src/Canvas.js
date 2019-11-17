export class Canvas {

	constructor(domElem=null, width=null, height=null) {
		this.domElem = domElem
		this.width = width
		this.height = height
		this.canvas = this.createCanvas()
		this.context = this.prepareContext(this.canvas)
	}

	createCanvas() {
		if (this.domElem)
			return this.domElem
		const canvas = document.createElement('canvas')
		canvas.width = this.width
		canvas.height = this.height
		return canvas
	}

	prepareContext(canvasElement) {
		const dpr = window.devicePixelRatio || 1
		const rect = canvasElement.getBoundingClientRect()
		canvasElement.width = rect.width 
		canvasElement.height = rect.height 
		const context = canvasElement.getContext('2d')
		context.scale(dpr, dpr)
		return context
	}
	
}


