import Sprite from 'bikebikebike/sprite';

export default class Bike {
  constructor(opts) {
    const DEFAULT_OPTS = {
      'speed': 0,
      'color': '#FFFFFF',
      'x': 0,
      'y': 0
    };
    this.SPRITE_POS_MOVING_LEFT = 64;
    this.SPRITE_POS_MOVING_RIGHT = 128;
    let options = Object.assign({}, DEFAULT_OPTS, opts);

    this.direction = 1;   // -1 = left, 0 = neutral, 1 = right (screen coords)
    this.speed = options.speed;
    this.color = options.color;
    this.x = options.x;
    this.y = options.y;
    this.sprite = new Sprite(options.image, {x: 0, y: this.SPRITE_POS_MOVING_RIGHT}, {width: 64, height: 64}, 10, 4, true);
  }

  draw(context) {
    this.sprite.draw(context, this.x + 200, this.y + 200);
  }

  update(dTime) {
    this.sprite.update(dTime);
  }

  setDirection(newDirection) {
    // no change
    if(this.direction === newDirection || newDirection === 0) { return; }

    let spriteYPos = newDirection < 0 ? this.SPRITE_POS_MOVING_LEFT : this.SPRITE_POS_MOVING_RIGHT;
    this.direction = newDirection;
    this.sprite.setFramePosition({x: 0, y: spriteYPos});
  }
}
