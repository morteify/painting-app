import { Canvas } from './src/Canvas.js'
import { PaintingTool } from './src/PaintingTool.js'

const canvasElement = document.querySelector('canvas')
const canvasObject = new Canvas(canvasElement)
const canvas = canvasObject.canvas
const ctx = canvasObject.context

const paintingTool = new PaintingTool(canvas, ctx)

const colorPicker = document.querySelector('.colorPicker')
colorPicker.onchange = event => {
	paintingTool.setLineProperties({ strokeStyle: event.target.value })
}

const opacitySlider = document.querySelector('.opacitySlider')
opacitySlider.onchange = event => {
	paintingTool.setLineProperties({ strokeStyleOpacity: event.target.value })
}


const sizeSlider = document.querySelector('.sizeSlider')
sizeSlider.onchange = event => {
	paintingTool.setLineProperties({ lineWidth: event.target.value })
}