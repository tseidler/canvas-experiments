"use strict";
class Particle {
  constructor(x, y, width, height, lifetime, decayrate, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.lifetime = lifetime;
    this.INITIAL_LIFETIME = lifetime;
    this.decayrate = decayrate;

    this.xVel = 50 - Math.random() * 100;
    this.yVel = 50 + Math.random() * 50;
  }

  update(dTime) {
    this.lifetime -= this.decayrate * dTime;

    this.x += this.xVel * dTime;
    this.y += this.yVel * dTime;
  }

  setAlpha(context) {
    context.globalAlpha = Math.max(this.lifetime / this.INITIAL_LIFETIME, 0);
  }

  draw(context) {
    this.setAlpha(context);
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.globalAlpha = 1;
  }
}

class CircleParticle extends Particle {
  draw(context) {
    this.setAlpha(context);
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, (this.width+this.height)/4, 0, 2 * Math.PI, false);
    context.fill();
    context.globalAlpha = 1;
  }
}

class FlatParticle extends Particle {
  draw(context) {
    this.setAlpha(context);
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height/2);
    context.globalAlpha = 1;
  }
}

class TallParticle extends Particle {
  draw(context) {
    this.setAlpha(context);
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width/2, this.height);
    context.globalAlpha = 1;
  }
}

class RotatingParticle extends Particle {
  constructor(x, y, width, height, lifetime, decayrate, color) {
    super(x, y, width, height, lifetime, decayrate, color);

    this.angle = 0;
    this.rotationSpeed = 25 + Math.random() * 55;
  }

  update(dTime) {
    super.update(dTime);
    this.angle += this.rotationSpeed * dTime;
  }

  draw(context) {
    this.setAlpha(context);
    context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle * Math.PI / 180);
      context.translate(-this.x, -this.y);
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}


class SmileyParticle extends Particle {
  draw(context) {
    this.setAlpha(context);
    context.strokeStyle = this.color;
    let size_outer = this.width * .85;
    let size_eye   = size_outer / 10;

    let size_mouth = size_outer * 0.7;
    let mouth_x = this.x + size_mouth;
    let mouth_y = this.y;

    let eye_left_x = mouth_x - size_mouth - 2 * size_eye;
    let eye_right_x = mouth_x - 2 * size_eye;
    let eye_y =  mouth_y - 2 * size_eye;

    context.beginPath();
    context.arc(this.x, this.y, size_outer, 0, Math.PI*2, true); // Outer circle

    context.moveTo(mouth_x ,mouth_y);
    context.arc(this.x, this.y, size_mouth, 0, Math.PI, false);  // Mouth (clockwise)

    context.moveTo(eye_left_x, eye_y);
    context.arc(eye_left_x - size_eye, eye_y, size_eye, 0, Math.PI*2, true);  // Left eye
    context.moveTo(eye_right_x, eye_y);
    context.arc(eye_right_x - size_eye, eye_y, size_eye, 0, Math.PI*2, true);  // Right eye
    context.stroke();

    context.globalAlpha = 1;
  }
}

class DuckParticle extends Particle {
  constructor(x, y, width, height, lifetime, decayrate, color) {
    super(x, y, width * .75, height * .75, lifetime, decayrate, color);
  }

  draw(context) {
    this.setAlpha(context);

    // face
    let face_x = this.x - this.width * .75;
    let face_y = this.y - this.height;

    // bill
    context.fillStyle = '#ff0000';
    context.beginPath();
    context.moveTo(face_x - this.width * .85, face_y);
    context.lineTo(face_x - this.width * 1.55, face_y - this.height/4);
    context.lineTo(face_x - this.width * 1.25, face_y);
    context.lineTo(face_x - this.width * 1.55, face_y + this.height/4);
    context.fill();

    // body
    context.fillStyle = '#ffd400';
    context.beginPath();
    context.ellipse(this.x, this.y, this.width*2, this.height, 0, 0, Math.PI * 2, false);
    context.moveTo(face_x, face_y);
    context.arc(face_x, face_y, this.width, 0, Math.PI * 2, false);
    context.fill();

    // eye
    context.fillStyle = '#000000';
    context.beginPath();
    context.arc(face_x - this.width/3, face_y - this.height/5, this.width/10, 0, Math.PI * 2, false);
    context.fill();

    context.globalAlpha = 1;
  }
}
