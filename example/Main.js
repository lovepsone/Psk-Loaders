/*
* @author lovepsone 2019 - 2024
*/

import * as THREE from './../libs/three.module.js';
import {CameraControls} from './CameraControls.js';
import {GUI} from './lil-gui.module.min.js';
import {ANIMATIONS} from './confAnims.js';

import {Character} from './Character.js';

let _renderer, _camera, _scene, mixer = null, _controls = null;
const clock = new THREE.Clock();
let model;

class MainEngenie {

	constructor(c_fov, c_Width, c_Height) {

		const self = this;
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

		_controls = new CameraControls(_camera, 'Window');
		_controls.UpdateEvents();

		const panel = new GUI({width: 310});
		const fCharacters = panel.addFolder('Characters');
		const changeHelmet = fCharacters.add({Helmet: 'none'}, 'Helmet').options(['none', 'Medium', 'Heavy', 'Biker', 'Military2', 'Military3', 'Stalker', 'Bandit', 'Edge']);
		const changeMask = fCharacters.add({Mask: 'none'}, 'Mask').options(['none', 'Military', 'MilitaryRespirator', 'RespiratorMK1', 'RespiratorMK2']);
		const changeTorso = fCharacters.add({Torso: 'TShirt'}, 'Torso').options(['TShirt', 'HazmatMK1', 'HazmatMK2', 'HazmatMK3', 'Heavy', 'Jacket1', 'Jacket2', 'JacketEdge1', 'JacketEdge2', 'JacketMilitary1', 'JacketMilitary2', 'JacketStalker1', 'JacketStalker2', 'Light', 'Medium']);
		const changeLegs = fCharacters.add({Legs: 'Pants'}, 'Legs').options(['Pants', 'Heavy', 'Light', 'Medium', 'Bandit1', 'Bandit2', 'Edge1', 'Edge2', 'Military1', 'Military2', 'Military3', 'Stalker1', 'Stalker2']);
		const changeBack = fCharacters.add({Back: 'none'}, 'Back').options(['none', 'Small', 'Medium', 'Large', 'OxygenMK1', 'OxygenMK2', 'OxygenMK3']);
		const changeFeet = fCharacters.add({Feet: 'Sneakers'}, 'Feet').options(['Sneakers', 'Stalker2', 'Stalker1', 'Military2', 'Military1', 'Edge2', 'Edge1', 'Bandit']);

		model = new Character(_scene);

		let names = ['none'];
		for (let i = 0; i < ANIMATIONS.Lobby.length; i++) names.push(ANIMATIONS.Lobby[i].name);
		const FAnim = panel.addFolder('Animation');
		const changeAnim = FAnim.add({Anim: 'none'}, 'Anim').options(names);

		changeAnim.onChange(function(e) { 

			if (mixer == null) mixer = new THREE.AnimationMixer(model.getAnimationGroup());

			if (e !== 'none') {

				for (let i = 0; i < model.getAnimations().length; i++) {

					if (e == model.getAnimations()[i][0].name) {

						mixer.stopAllAction(); // is fixed?
						mixer.clipAction(model.getAnimations()[i][0]).play();
						break
					}
				}
			} else mixer.stopAllAction();

		});

		changeHelmet.onChange(function(e) { model.UpdateModel(e, 'helmet'); });
		changeBack.onChange(function(e) { model.UpdateModel(e, 'back'); });
		changeMask.onChange(function(e) { model.UpdateModel(e, 'mask'); });
		changeTorso.onChange(function(e) { model.UpdateModel(e, 'torso'); });
		changeLegs.onChange(function(e) { model.UpdateModel(e, 'legs'); });
		changeFeet.onChange(function(e) { model.UpdateModel(e, 'feet'); });

		/*loaderPSK.load({url: './Game/Characters/Male/Bodies/MaleBase_01_Head/SK_MaleBase_01_Head.psk', PathMaterials: MATERIALS}, function(geometry, textures, urlMaterial, skeleton) {

			let materials = [];
			for (let i = 0; i < textures.length; i++) {
	
				if (textures[i].Diffuse == null) break;

				const texture = new THREE.TextureLoader().load(`./Game/Characters/Textures/${textures[i].Diffuse}.png`);
				console.log(textures[i].Diffuse);
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;

				if (textures[i].Diffuse === "T_MaleBase_01_Head_BC") {

					const t = new THREE.ShaderMaterial({
						uniforms: {
						  t_head: {value: texture},
						  t_Eyebrow: {value: new THREE.TextureLoader().load(`./Game/Characters/Textures/Eyebrow/T_Male_Eyebrow_06_BC.png`)},
						},
						vertexShader: `
						  varying vec2 v_uv;
						  varying float v_textureIndex;
						  void main() {
							// This maps the uvs you mentioned to [0, 1, 2, 3]
							v_textureIndex = step(0.5, uv.x) + step(0.5, uv.y) * 2.0;
							v_uv = uv;
							gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						  }
						`,
						fragmentShader: `
						  varying vec2 v_uv;
						  varying float v_textureIndex;
						  uniform sampler2D t_head;
						  uniform sampler2D t_Eyebrow;

						  void main() {

							vec4 color = texture2D(t_head, v_uv);
							vec4 color_brow = texture2D(t_Eyebrow, v_uv);

							if (color_brow.r < 0.5) {
								
								//gl_FragColor = color_brow;
								gl_FragColor = mix(color_brow, color, color.r);
							} else {

								gl_FragColor= color;
							}
						  }
						`,
					  });

					  materials.push(t);

				} else {

					materials.push(new THREE.MeshBasicMaterial({map: texture, wireframe: false, side: THREE.DoubleSide}));
				}
			}

			mesh = new THREE.Mesh(geometry, materials);
			_scene.add(mesh);

		});*/

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