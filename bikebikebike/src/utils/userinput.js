export default class UserInput {
  constructor() {
    this.keyspressed = {};

    // set keydown, keyup event listeners
    document.addEventListener('keydown', (e) => this.setUserInput(e.keyCode, true));
    document.addEventListener('keyup', (e) => this.setUserInput(e.keyCode, false));
  }

  setUserInput(keycode, pressed) {
    let keyname;
    switch(keycode) {
      case 37:
        keyname = 'left';
        break;
      case 39:
        keyname = 'right';
        break;
      case 38:
        keyname = 'up';
        break;
      case 40:
        keyname = 'down';
        break;
      case 32:
        keyname = 'space';
        break;
      default:
        keyname = keycode;
    }
    this.keyspressed[keyname] = pressed;
  }

  pressed(key = '') {
    return this.keyspressed.hasOwnProperty(key) && this.keyspressed[key] === true;
  }
}
