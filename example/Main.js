/*
* @author lovepsone 2019 - 2021
*/

import * as THREE from './../libs/three.module.js';
import {PSKLoader} from './../src/PSKLoader.js';
import {PSALoader} from './../src/PSALoader.js';

let _renderer, _camera, _scene; 
let mixer, clock = new THREE.Clock(), mixer2;
let mesh, mesh2;

class MainEngenie {

	constructor(c_fov, c_Width, c_Height) {

		const canvas = document.createElement( 'canvas' );
		const context = canvas.getContext('webgl2', {alpha: true, antialias: false});
		// renderer settings
		_renderer = new THREE.WebGLRenderer({antialias: true}/*{ canvas: canvas, context: context }*/);
		_renderer.setClearColor(0x808080);
		_renderer.setPixelRatio(window.devicePixelRatio);
		_renderer.setSize(window.innerWidth, window.innerHeight);
		_renderer.shadowMap.enabled = true;

		_camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 9000);
		_camera.position.set(0, 300, 170);
		_scene = new THREE.Scene();


		_camera.lookAt(new THREE.Vector3(0,0,0))

		const loader = new PSKLoader();
		loader.load({url: './meshes/SK_Male_Jacket_Military_02.psk', PathMaterials: './meshes/'},

			function(geometry, textures, urlTexture, skeleton) {

				let materials = [];

				for (let i = 0; i < textures.length; i++) {

                    const texture = new THREE.TextureLoader().load(`${urlTexture}${textures[i].Diffuse}.png`);
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    materials.push(new THREE.MeshBasicMaterial({map: texture, wireframe: false, side: THREE.DoubleSide}));
                }

				mesh = new THREE.SkinnedMesh(geometry, materials);
				mesh.add(skeleton.bones[0]);
				mesh.bind(skeleton);
				const skeletonHelper = new THREE.SkeletonHelper(mesh);

				_scene.add(skeletonHelper);
				_scene.add(mesh);

				const aloader = new PSALoader();

				aloader.load('./meshes/SK_MaleBase_01_Skeleton.psa', skeleton.bones,

					function(anims) {
						mesh.animations.push(anims);
						mixer = new THREE.AnimationMixer(mesh);
						mixer.clipAction(anims[2]).play();
					}
				);
			},

			function(xhr) {

				console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},

			function(error) {

				console.log('An error happened' + error);
			}
		);
	
		window.addEventListener('resize', this.onRenderResize);

	}

	Render(frame) {

		if (mixer) mixer.update(clock.getDelta());
		_renderer.render(_scene, _camera);
	}
	
	getRender() {

		return _renderer;
	}


	getControlsCamera() {

		return _controls;
	}


	onRenderResize() {

		_camera.aspect =  window.innerWidth / window.innerHeight;
		_camera.updateProjectionMatrix();
		_renderer.setSize( window.innerWidth, window.innerHeight);
	}
};

export {MainEngenie};