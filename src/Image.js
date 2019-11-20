



// console.log(imagePreview)
// imagePreview.addEventListener('load', e => {
// 	context.drawImage(imagePreview, 0, 0)
// 	invertColors()
// })


// const invertColors = () => {
// 	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
// 	for (let i = 0; i < imageData.data.length; i += 4) {
// 		imageData.data[i] = 255 - imageData.data[i]
// 		imageData.data[i + 1] = 255 - imageData.data[i + 1]
// 		imageData.data[i + 2] = 255 - imageData.data[i + 2]
// 		imageData.data[i + 3] = 255
// 	}

// 	ctx.putImageData(imageData, 0, 0) 
// }


export class ImagePreview {

	constructor(canvas, context) {
		this.canvas = canvas
		this.context = context
		this.imagePreview = new Image()
	}

	displayImagePreview = imageInput => {
		imageInput.onchange = event => {
			const reader = new FileReader()
			if (imageInput.files && imageInput.files[0]) {
				reader.onload = e => {
					this.imagePreview.src = e.target.result
				}
				reader.readAsDataURL(imageInput.files[0])
			}
		}

		this.imagePreview.addEventListener('load', e => {
			this.context.drawImage(this.imagePreview, 0, 0)
		})
	}

	invertColors = () => {
		const imageData = this.context.getImageData(0, 0, canvas.width, canvas.height)
		for (let i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i] = 255 - imageData.data[i]
			imageData.data[i + 1] = 255 - imageData.data[i + 1]
			imageData.data[i + 2] = 255 - imageData.data[i + 2]
			imageData.data[i + 3] = 255
		}

		this.context.putImageData(imageData, 0, 0) 
	}

	setGrayscale = () => {
		const imageData = this.context.getImageData(0, 0, canvas.width, canvas.height)
		console.log(imageData)
		for (let i = 0; i < imageData.data.length; i += 4) {
			var avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
			imageData.data[i]     = avg; // red
			imageData.data[i + 1] = avg; // green
			imageData.data[i + 2] = avg; // blue
		  }
		  this.context.putImageData(imageData, 0, 0);
	}

}