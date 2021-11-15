const KEY_CODES = {
  'left': 37,
  'up': 38,
  'right': 39,
  'down' : 40,
  'space': 32
};

export class BasicCharacterControllerInput {
  constructor() {
    this._init()
  }
  _init() {
    this._keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      jump: false,
      attack: false,
      special: false,
      pause: false
    }
    document.addEventListener('keydown', this._keyDown.bind(this))
    document.addEventListener('keyup', this._keyUp.bind(this))
  }
  _keyDown(event) {
    switch(event.keyCode) {
      case KEY_CODES.up:
	this._keys.up = true
	break
      case KEY_CODES.down:
	this._keys.down = true
	break
      case KEY_CODES.left:
	this._keys.left = true
	break
      case KEY_CODES.right:
	this._keys.right = true
	break
      case KEY_CODES.space:
	this._keys.jump = true
	break
      default:
	break
    }
  }
  _keyUp(event) {
    switch(event.keyCode) {
      case KEY_CODES.up:
	this._keys.up = false
	break
      case KEY_CODES.down:
	this._keys.down = false
	break
      case KEY_CODES.left:
	this._keys.left = false
	break
      case KEY_CODES.right:
	this._keys.right = false
	break
      case KEY_CODES.space:
	this._keys.jump = false
	break
      default:
	break
    }
  }
}


