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

    this.loadResources();
  }

  start() {
    this.player = new Bike({image: this.resources.images.get('biker')});

    this.resizeCanvas();
    window.requestAnimationFrame((timestamp) => this.draw(timestamp));
  }

  draw(timestamp) {
    if(!this.lastDraw) { this.lastDraw = timestamp; }
    let dTime = (timestamp - this.lastDraw) / 1000;

    this.clearCanvas();
    
    // DRAW ALL THE THINGS!!!1
    this.player.update(dTime);
    this.player.draw(this.context);

    this.lastDraw = timestamp;
    
    // keep drawing forever
    window.requestAnimationFrame((time) => this.draw(time));
  }

  clearCanvas() {
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore()
  }

  resizeCanvas(oEvent) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  loadResources() {
    this.resources.images.load([
        {name: 'biker', URI: '/images/biker.png'}
      ],
      () => { this.start() }
    );
  }
}
