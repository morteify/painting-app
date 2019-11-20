export class PaintingTool {
	
	constructor(canvas, context) {
		this.canvas = canvas
		this.context = context
		this.MAIN_MOUSE_BUTTON = 0
		this.shouldDraw = false
	
		this.defaultLineProps = {
			lineWidth: 30,
			lineJoin: 'round',
			lineCap: 'round',
			strokeStyle: '#000000',			
		}
		this.setLineProperties(this.defaultLineProps)
		this.setEventListeners()
		canvas.style.cursor = 'crosshair'
	}


	// createSvgShape = () => {
	// 	const ns = 'http://www.w3.org/2000/svg'
	// 	const div = document.getElementById('drawing') 
	// 	const svg = document.createElementNS(ns, 'svg')
	// 	svg.setAttributeNS(null, 'width', '100%')
	// 	svg.setAttributeNS(null, 'height', '100%')
	// 	div.appendChild(svg)
	// 	const rect = document.createElementNS(ns, 'rect')
	// 	rect.setAttributeNS(null, 'width', 100)
	// 	rect.setAttributeNS(null, 'height', 100)
	// 	rect.setAttributeNS(null, 'fill', '#f06')
	// 	svg.appendChild(rect)

	// 	return svg
	// }

	static addOpacity(currentColor, val) {
		if (currentColor.includes('#'))
			return `${currentColor}${val.padStart(2, '0')}`
		if (currentColor.includes('rgba')) {
			const regExp = /\(([^)]+)\)/g
			let rgbaValues = regExp.exec(currentColor)[0].split(',')
			rgbaValues[3] = ` ${val * 0.01})`
			rgbaValues = rgbaValues.join(',')
			return `rgba${rgbaValues}`
		}

	}

	setEventListeners = () => {
		this.canvas.addEventListener('mousedown', this.startDrawing)
		this.canvas.addEventListener('mouseup', this.endDrawing)
		this.canvas.addEventListener('mousemove', this.moveDrawing, false)
		
		const colorPicker = document.querySelector('.colorPicker')
		colorPicker.onchange = event => {
			this.setLineProperties({ strokeStyle: event.target.value })
		}

		const opacitySlider = document.querySelector('.opacitySlider')
		opacitySlider.onchange = event => {
			this.setLineProperties({ strokeStyleOpacity: event.target.value })
		}

		const sizeSlider = document.querySelector('.sizeSlider')
		sizeSlider.onchange = event => {
			this.setLineProperties({ lineWidth: event.target.value })
		}
	}

	setLineProperties = lineProps => {
		Object.entries(lineProps).forEach(([key, val]) => {
			if (JSON.stringify(lineProps).includes('strokeStyleOpacity')) {
				return this.context.strokeStyle = PaintingTool.addOpacity(this.context.strokeStyle, lineProps.strokeStyleOpacity)
			}
			return this.context[key] = val
		})
	}


	startDrawing = event => {
		if (event.button === this.MAIN_MOUSE_BUTTON) {
			this.shouldDraw = true
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

