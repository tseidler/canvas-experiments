export default class ImageCache {
  constructor(missing_image = "/images/404.png") {
    this.cachedImages = {};

    var image = new Image();
    image.src = missing_image;
    this.missing_image = image;
  }

  load(images, callback) {
    let imagesToLoad = images.length;
    let imagesLoaded = 0;

    for(const image of images) {
      if(!this.cachedImages[image.name]) {
        let newImage = new Image();
        newImage.onload = () => {
          this.cachedImages[image.name] = newImage;

          if(imagesLoaded === imagesLoaded && typeof callback === "function") {
            callback();
          }
        };
        newImage.src = image.URI;
      }
    }
  }

  get(imageName) {
    if(this.cachedImages.hasOwnProperty(imageName)) {
      return this.cachedImages[imageName];
    }

    return this.missing_image;
  }
}
