export default class ImageCache {
  constructor(missing_image = "/images/404.png") {
    this.cachedImages = {};

    var image = new Image();
    image.src = missing_image;
    this.missing_image = image;
  }

  get(imageName) {
    if(this.cachedImages.hasOwnProperty(imageName)) {
      return this.cachedImages[imageName];
    }

    return this.missing_image;
  }
}