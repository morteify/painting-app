import { Canvas } from './src/Canvas.js'
import { PaintingTool } from './src/PaintingTool.js'
import { ImagePreview } from './src/ImagePreview.js'

const forms = document.querySelectorAll('form')
const load = () => {
	forms.forEach(form => form.reset())
} 
window.onload = load 

const canvasElement = document.querySelector('canvas')
const canvasObject = new Canvas(canvasElement)
const canvas = canvasObject.canvas
const ctx = canvasObject.context

const paintingTool = new PaintingTool(canvas, ctx)
const imageInput = document.querySelector('#image')
const imagePreview = new ImagePreview(canvas, ctx)
imagePreview.displayImagePreview(imageInput)


const menus = document.querySelectorAll('.menu')

function changeActiveTool(menus, activeTool) {
	menus.forEach(item => {
		const className = item.attributes.class.nodeValue
		if (className.includes(activeTool)) {
			if (className.includes('disabled')) {
				item.attributes.class.nodeValue = className.replace('disabled', 'active')
			}
		}
		else if (className.includes('active')) {
			item.attributes.class.nodeValue = className.replace('active', 'disabled')
		}
	})
}

const iconButtons = document.querySelectorAll('.icon')
iconButtons.forEach(icon => {
	icon.onclick = () => {
		changeActiveTool(menus, icon.id)
	}
})

