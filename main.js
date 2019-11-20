import { Canvas } from './src/Canvas.js'
import { PaintingTool } from './src/PaintingTool.js'
import { ImagePreview } from './src/Image.js'

const canvasElement = document.querySelector('canvas')
const canvasObject = new Canvas(canvasElement)
const canvas = canvasObject.canvas
const ctx = canvasObject.context

const paintingTool = new PaintingTool(canvas, ctx)

const imageInput = document.querySelector('#image')
const imagePreview = new ImagePreview(canvas, ctx)

imagePreview.displayImagePreview(imageInput)
const invertColorsButton = document.querySelector('#invert-colors-button')
const greyScaleButton = document.querySelector('#greyscale-button')

invertColorsButton.onclick = event => {
	imagePreview.invertColors()
}

greyScaleButton.onclick = event => {
	imagePreview.setGrayscale()
}

