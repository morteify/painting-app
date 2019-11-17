import { Canvas } from './src/Canvas.js'
import { PaintingTool } from './src/PaintingTool.js'

const canvasElement = document.querySelector('canvas')
const canvasObject = new Canvas(canvasElement)
const canvas = canvasObject.canvas
const ctx = canvasObject.context

const paintingTool = new PaintingTool(canvas, ctx)



