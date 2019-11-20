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
			shadowColor: '#000000',
			shadowBlur: 0
		}
		this.setLineProperties(this.defaultLineProps)
		this.setEventListeners()
		canvas.style.cursor = 'crosshair'
	}

	addOpacity = (currentColor, val) => {
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
		
		const elements = [
			{className: '.color-picker', prop: 'strokeStyle'},
			{className: '.opacity-slider', prop: 'strokeStyleOpacity'},
			{className: '.size-slider', prop: 'lineWidth'},
			{className: '.shadow-blur-slider', prop: 'shadowBlur'},
			{className: '.line-cap-selector', prop: 'lineCap'},
			{className: '.shadow-color-picker', prop: 'shadowColor'},
		]

		elements.forEach(slider => {
			try {
				const elem = document.querySelector(slider.className)
				console.log(elem)
				elem.onchange = event => {
					elem.value = event.target.value
					this.setLineProperties({ [slider.prop]: event.target.value.toLowerCase() })
				}
			} catch(error) {
				console.log(error)
			}
		})
	}

	setLineProperties = lineProps => {
		Object.entries(lineProps).forEach(([key, val]) => {
			if (JSON.stringify(lineProps).includes('strokeStyleOpacity')) {
				return this.context.strokeStyle = this.addOpacity(this.context.strokeStyle, lineProps.strokeStyleOpacity)
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

