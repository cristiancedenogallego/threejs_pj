
import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import {MainCharacter} from './MainCharacter.js';

class BasicWorld {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth - 50, window.innerHeight - 50);
    document.body.appendChild(this.renderer.domElement)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(50, 10, 100);
    this.camera.far = 1000;
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.background = new THREE.CubeTextureLoader().setPath('/skybox/').load([
      'px.jpg', 'nx.jpg',
      'py.jpg', 'ny.jpg',
      'pz.jpg', 'nz.jpg'
    ]);
    this.scene.add(this.directionalLight);
    var plane = new THREE.PlaneGeometry(200, 200, 20)
    var mesh = new THREE.Mesh(plane, new THREE.MeshPhongMaterial({ color: 0x00ff00 }));
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('/textures/grass.jpeg', (texture) => {
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    });
    mesh.rotateX(-Math.PI / 2)
    this.directionalLight.lookAt(mesh.position);
    this.directionalLight.position.set(0, 3, 10)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement );
    this.scene.add(mesh);
    this.addDance()
    this.render();
  }

  getScene() {
    return this.scene;
  }

  addDance() {
    this.character = new MainCharacter(this.scene);
    this.camera.position.set(0, 3, 10)
  }

  addPjs() {
    var loader = new GLTFLoader();
    loader.load('/models/pj/source/model.gltf', (gltf) => {

      var model = gltf.scene;

      this.scene.add(model);
      model.material= new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      this.directionalLight.lookAt(model.position);
      this.camera.position.set(0, 3, 10)
      this.camera.lookAt(model)
      this.directionalLight.position.set(0, 3, 10)
      this.camera.needsUpdate = true
      model.position.set(1, 0, 1);
      model.scale.set(0.1, 0.1, 0.1);
      model.traverse((child) => {
	if (child.isMesh) {
	  child.material.map = new THREE.TextureLoader().load('/models/pj/textures/texture.png')
	  child.castShadow = true;
	  child.receiveShadow = true;
	  child.material.needsUpdate = true;
	}
      })
    })
  }

  render() {
    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      this.render();
      this.character.update();
    })

  }
}

new BasicWorld();
