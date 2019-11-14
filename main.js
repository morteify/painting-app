import { Canvas } from './src/Canvas.js'

const body = document.querySelector('body')
const canvas = new Canvas(800, 500).createCanvas()
const ctx = canvas.getContext('2d')
canvas.style.background = 'coral'
body.appendChild(canvas)