export class PaintingTool {
	
	constructor(canvas, context) {
		this.context = context
		this.MAIN_MOUSE_BUTTON = 0
		this.shouldDraw = false
		canvas.addEventListener('mousedown', this.startDrawing)
		canvas.addEventListener('mouseup', this.endDrawing)
		canvas.addEventListener('mousemove', this.moveDrawing, false)
	}


	setLineProperties = () => {
		this.context.lineWidth = 20
		this.context.lineJoin = 'round'
		this.context.lineCap = 'round'
	}


	startDrawing = event => {
		if (event.button === this.MAIN_MOUSE_BUTTON) {
			this.shouldDraw = true
			this.setLineProperties()
			this.context.beginPath()
			const elementRect = event.target.getBoundingClientRect()
			this.context.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top)
		}
	}

	endDrawing = event => {
		if (event.button === this.MAIN_MOUSE_BUTTON) {
			this.shouldDraw = false
		}
	}

	moveDrawing = event => {
		if (this.shouldDraw) {
			const elementRect = event.target.getBoundingClientRect()
			this.context.lineTo(event.clientX - elementRect.left, event.clientY - elementRect.top)
			this.context.stroke()
		}
	}

}

