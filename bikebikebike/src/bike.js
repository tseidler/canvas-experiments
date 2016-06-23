import Sprite from 'bikebikebike/sprite';

export default class Bike {
  constructor(opts) {
    const DEFAULT_OPTS = {
      'speed': 0,
      'color': '#FFFFFF',
      'x': 0,
      'y': 0
    };
    let options = Object.assign({}, DEFAULT_OPTS, opts);
    
    this.speed = options.speed;
    this.color = options.color;
    this.x = options.x;
    this.y = options.y;
    this.image = new Image();
    this.image.src = '/images/biker.png';
    this.sprite = new Sprite(this.image, {x: 0, y: 128}, {width: 64, height: 64}, 10, 4, true);
  }

  draw(context) {
    // context.fillStyle = this.color;
    // context.fillRect(this.x, this.y, 50, 50);

    this.sprite.draw(context, this.x + 200, this.y + 200);
  }

  update(dTime) {
    this.sprite.update(dTime);
  }
}