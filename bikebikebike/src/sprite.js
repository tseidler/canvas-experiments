export default class Sprite {
  constructor(imageURI, framePosition, frameSize, animationSpeed, numFrames, repeat = false) {
    this.image = imageURI;
    this.pos = framePosition;
    this.size = frameSize;
    this.speed = animationSpeed;
    this.numFrames = numFrames;
    this.repeat = repeat;

    this.currentFrame = 0;
    this.done = false;
  }

  update(dTime) {
    this.currentFrame += this.speed * dTime;
  }

  draw(context, screenX, screenY) {
    let frameIndex = 0;
    if(this.speed > 0 && this.numFrames > 1) {
      frameIndex = Math.floor(this.currentFrame) % this.numFrames;

      if(this.repeat === false && frameIndex >= this.numFrames) {
        this.done = true;
        return;
      }
    }

    let imageX = this.pos.x;
    let imageY = this.pos.y;
    imageX += frameIndex * this.size.width;
    context.drawImage(this.image, imageX, imageY, this.size.width, this.size.height, screenX, screenY, this.size.width, this.size.height);
  }
}