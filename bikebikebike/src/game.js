export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    window.addEventListener('resize', this.resizeCanvas, false);

    this.resizeCanvas();
  }

  resizeCanvas(oEvent) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    // window.requestAnimationFrame(draw);
  }
}
