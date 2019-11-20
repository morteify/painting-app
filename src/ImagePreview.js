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
		for (let i = 0; i < imageData.data.length; i += 4) {
			var avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
			imageData.data[i]     = avg; // red
			imageData.data[i + 1] = avg; // green
			imageData.data[i + 2] = avg; // blue
		  }
		  this.context.putImageData(imageData, 0, 0);
	}

	setBrightness = (brightness) => {
		const imageData = this.context.getImageData(0, 0, canvas.width, canvas.height)
		for (var i = 0; i < imageData.data.length; i+= 4) {
			imageData.data[i] += 255 * (brightness / 100);
			imageData.data[i+1] += 255 * (brightness / 100);
			imageData.data[i+2] += 255 * (brightness / 100);
		  }
		this.context.putImageData(imageData, 0, 0);
	}


	truncateColor = (value) => {
		if (value < 0) {
		  value = 0;
		} else if (value > 255) {
		  value = 255;
		}
	  
		return value;
	  }
	  
	setContrast = contrast => {
		const imageData = this.context.getImageData(0, 0, canvas.width, canvas.height)
		const factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));
	  
		for (let i = 0; i <imageData.data.length; i+= 4) {
		 imageData.data[i] = this.truncateColor(factor * (imageData.data[i] - 128.0) + 128.0);
		 imageData.data[i+1] = this.truncateColor(factor * (imageData.data[i+1] - 128.0) + 128.0);
		 imageData.data[i+2] = this.truncateColor(factor * (imageData.data[i+2] - 128.0) + 128.0);
		}
		this.context.putImageData(imageData, 0, 0);
	  }

}