import { Canvas } from './src/Canvas.js'

function prepareContext(canvasElement) {
	let dpr = window.devicePixelRatio || 1
	let rect = canvasElement.getBoundingClientRect()
	canvasElement.width = rect.width 
	canvasElement.height = rect.height 
   
	let context = canvasElement.getContext('2d')
	// context.scale(dpr, dpr)
	
	return context
}

const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')
const ctx = prepareContext(canvas)


function setLineProperties(context) {
	context.lineWidth = 20
	context.lineJoin = 'round'
	context.lineCap = 'round'
	return context
}

const MAIN_MOUSE_BUTTON = 0
let shouldDraw = false
function startDrawing(event) {
	if (event.button === MAIN_MOUSE_BUTTON) {
		shouldDraw = true
		setLineProperties(ctx)
	
		ctx.beginPath()
		
		let elementRect = event.target.getBoundingClientRect()
		ctx.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top)
	}
}
function endDrawing(event) {
	if (event.button === MAIN_MOUSE_BUTTON) {
		shouldDraw = false
	}
}
function moveDrawing(event) {
	if (shouldDraw) {
		let elementRect = event.target.getBoundingClientRect()
		ctx.lineTo(event.clientX - elementRect.left, event.clientY - elementRect.top)
		ctx.stroke()
	}
}

canvas.addEventListener('mousedown', startDrawing)

canvas.addEventListener('mouseup', endDrawing)

canvas.addEventListener('mousemove', moveDrawing, false)
