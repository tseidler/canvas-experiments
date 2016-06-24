import ImageCache from 'utils/imagecache';
import Bike from 'bikebikebike/bike';

export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    this.resources = {
      images: new ImageCache()
    }
    this.lastDraw = null;

    window.addEventListener('resize', this.resizeCanvas, false);

    this.bike = new Bike({image: this.resources.images.get('/images/biker.png')});
  }

  resizeCanvas(oEvent) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.resizeCanvas();
    window.requestAnimationFrame((timestamp) => this.draw(timestamp));
  }

  draw(timestamp) {
    if(!this.lastDraw) { this.lastDraw = timestamp; }
    let dTime = (timestamp - this.lastDraw) / 1000;
    
    this.bike.update(dTime);
    this.bike.draw(this.context);

    this.lastDraw = timestamp;
    // keep drawing
    window.requestAnimationFrame((time) => this.draw(time));
  }
}
