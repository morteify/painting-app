export class ImagePreview {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.imagePreview = new Image();
    this._defaultImageData = null
    this.setEventListeners();
  }

  set defaultImageData(imageData) {
    this._defaultImageData = imageData.data;
  }

  setEventListeners = () => {
    const elements = [
      { className: "#invert-colors-button", method: () => this.invertColors() },
      { className: "#greyscale-button", method: () => this.setGrayscale() },
      {
        className: ".brightness-slider",
        method: event => this.setBrightness(parseInt(event, 10))
      },
      {
        className: ".contrast-slider",
        method: event => this.setContrast(parseInt(event, 10))
      }
    ];

    elements.forEach(elem => {
      try {
        const item = document.querySelector(elem.className);
        item.onclick = event => {
          elem.method(event.target.value);
        };
      } catch (error) {
        console.log(error);
      }
    });
  };

  displayImagePreview = imageInput => {
    imageInput.onchange = event => {
      const reader = new FileReader();
      if (imageInput.files && imageInput.files[0]) {
        reader.onload = e => {
          this.imagePreview.src = e.target.result;
        };

        reader.readAsDataURL(imageInput.files[0]);
      }
    };

    this.imagePreview.addEventListener("load", e => {
      this.context.drawImage(this.imagePreview, 0, 0, 1920, 1080);
      const imageData = this.context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
  
      this.defaultImageData = imageData
    });


  };

  invertColors = () => {
    const imageData = this.context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255 - imageData.data[i];
      imageData.data[i + 1] = 255 - imageData.data[i + 1];
      imageData.data[i + 2] = 255 - imageData.data[i + 2];
      imageData.data[i + 3] = 255;
    }

    this.context.putImageData(imageData, 0, 0);
  };

  setGrayscale = () => {
    const imageData = this.context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    for (let i = 0; i < imageData.data.length; i += 4) {
      let average =
        (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = average;
      imageData.data[i + 1] = average;
      imageData.data[i + 2] = average;
    }
    this.context.putImageData(imageData, 0, 0);
  };

  setBrightness = brightness => {
    const imageData = this.context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    )
    imageData.data.set(this._defaultImageData)

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] += 255 * (brightness / 100);
      imageData.data[i + 1] += 255 * (brightness / 100);
      imageData.data[i + 2] += 255 * (brightness / 100);
    }
    this.context.putImageData(imageData, 0, 0);
  };

  setContrast = contrast => {

    const imageData = this.context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    )
    imageData.data.set(this._defaultImageData)
    const factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

    const editColor = value => {
      if (value < 0) {
        value = 0;
      } else if (value > 255) {
        value = 255;
      }

      return value;
    };

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = editColor(
        factor * (imageData.data[i] - 128.0) + 128.0
      );
      imageData.data[i + 1] = editColor(
        factor * (imageData.data[i + 1] - 128.0) + 128.0
      );
      imageData.data[i + 2] = editColor(
        factor * (imageData.data[i + 2] - 128.0) + 128.0
      );
    }
    this.context.putImageData(imageData, 0, 0);
  };
}

