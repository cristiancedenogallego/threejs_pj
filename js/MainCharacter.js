import * as THREE from 'https://cdn.skypack.dev/three';
import {FBXLoader} from 'https://cdn.skypack.dev/three/examples/jsm/loaders/FBXLoader.js'
import {BasicCharacterControllerInput} from './CharacterController.js';

export class MainCharacter {
  constructor(scene) {
    this.scene = scene;
    this._init()
    this.actions = {}
    this.prevAction = null;
    this.controls = new BasicCharacterControllerInput();
  }
  _init() {
    var loader = new FBXLoader();
    loader.load('models/animal.fbx', (fbx) => {
      fbx.scale.setScalar(0.01);
      fbx.traverse((child) => {
	if (child.isMesh) {
	  child.castShadow = true;
	  child.receiveShadow = true;
	}
      })
      this.animLoader = new FBXLoader()
      this.mixer = new THREE.AnimationMixer(fbx);
    	this.mixer.addEventListener('finished', (e) => {
	  this.idle()
	})

      fbx.name = 'mainCharacter';
      this.animLoader.load('models/jump.fbx',this.animLoadedGenerator('jump'))
      this.animLoader.load('models/dance.fbx',this.animLoadedGenerator('dance'))
      this.animLoader.load('models/walk.fbx',this.animLoadedGenerator('walk'))
      this.animLoader.load('models/idle.fbx',this.animLoadedGenerator('idle'))
      this.scene.add(fbx);
    })
  }

  jump() {
    this.actions.jump.play()
    this.prevAction = this.actions.jump;
  }
  dance() {

  }
  walk() {
    if (this.prevAction == this.actions.walk) {
      return;
    }
    this.actions.walk.reset();
    this.actions.walk.play()
    this.prevAction = this.actions.walk;
  }
  idle() {
    this.actions.idle.reset();
    this.actions.idle.play()
    this.prevAction = this.actions.idle;
  }
  animLoadedGenerator(animName) {
    var self = this;
    return anim => {
      const action = this.mixer.clipAction(anim.animations[0]);

      this.mixer.addEventListener('finished', (e) => {
	const obj = this.scene.children.find(c => c.name == 'mainCharacter')
      })
      action.setLoop(THREE.LoopOnce);

      self.actions[animName] = action;
      action.clampWhenFinished = true;
      if (self.prevAction) {
	action.crossFadeFrom(self.prevAction, animName == 'idle' ? 0 :0.2, true);
      }
      action.name = animName;
      this.actions[animName] = action;
    }
  }
  update() {
    const obj = this.scene.children.find(c => c.name == 'mainCharacter')
    if (this.controls._keys.jump) {
      this.jump()
    }
    if (this.controls._keys.dance) {
      this.dance()
    }
    if (this.controls._keys.up) {
      obj.position.z += 0.02;
      this.walk()
    }
    if (this.mixer) {
      this.mixer.update(0.01);
    }
  }
}

