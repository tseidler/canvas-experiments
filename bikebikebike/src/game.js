import UserInput from 'utils/userinput';
import ImageCache from 'utils/imagecache';
import Bike from 'bikebikebike/bike';

export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    this.input = new UserInput();
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
    window.requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  update(timestamp) {
    const MOVE_SPEED = 500;  // px / sec
    if(!this.lastUpdate) { this.lastUpdate = timestamp; }
    let dTime = (timestamp - this.lastUpdate) / 1000;
    let player = this.player;
    let oldXPosition = player.x;

    // handle controls (basic)
    if(this.input.pressed('left')) {
      player.x -= MOVE_SPEED * dTime;
    }
    if(this.input.pressed('right')) {
      player.x += MOVE_SPEED * dTime;
    }

    if(this.input.pressed('up')) {
      player.y -= MOVE_SPEED * dTime;
    }
    if(this.input.pressed('down')) {
      player.y += MOVE_SPEED * dTime;
    }

    let playerDirection = player.x > oldXPosition ? 1
                      : player.x < oldXPosition ? -1
                      : 0;
    player.setDirection(playerDirection);

    this.draw(dTime);

    // keep drawing forever
    this.lastUpdate = timestamp;
    window.requestAnimationFrame((time) => this.update(time));

  }

  draw(dTime) {
    this.clearCanvas();

    // DRAW ALL THE THINGS!!!1
    this.player.update(dTime);
    this.player.draw(this.context);
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
