/*
* @author lovepsone 2019 - 2024
*/

import * as THREE from './../libs/three.module.js';
import {PSKLoader} from './../src/PSKLoader.js';
import {PSALoader} from './../src/PSALoader.js';
import {CameraControls} from './CameraControls.js';
import {GUI} from './lil-gui.module.min.js';
import {CHARACTERS} from './confModel.js';
import {ANIMATIONS} from './confAnims.js';

let _renderer, _camera, _scene, mixer = null, _controls = null;
const loaderPSK = new PSKLoader(), loaderPSA = new PSALoader(), clock = new THREE.Clock();

let tCharacter = {
	'helmet': null,
	'head': null,
	'mask': null,
	'neck': null,
	'torso': null,
	'hands': null,
	'legs': null,
	'back': null,
	'feet': null,

	'skeleton': null,
	'matrix': null,
	'skeletonHead': null,
	'matrixHead': null,
};

const animGroup = new THREE.AnimationObjectGroup();
const MATERIALS = './Game/Characters/Materials/';
const TEXTURES = './Game/Characters/Textures/';
let tAnimation;
const tLoader = new THREE.TextureLoader();


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

		loaderPSA.loadList(ANIMATIONS.Lobby, function(anims) {

			tAnimation = anims;
		});

		/*loaderPSA.load({url: ANIMATIONS.Lobby[1].file, urlCfg: ANIMATIONS.Lobby[1].conf}, function(anims) {

				tAnimation = anims;
		});*/

		const FAnim = panel.addFolder('Animation');
		const changeAnim = FAnim.add({Anim: 'none'}, 'Anim').options(['none', 'Idle_additive', 'Lobby_back_man01_idle_01', 'Lobby_back_man02_idle_01', 'Lobby_back_man03_idle_01']);

		changeAnim.onChange(function(e) { 

			if (mixer == null) mixer = new THREE.AnimationMixer(animGroup);

			if (e !== 'none') {

				for (let i = 0; i < tAnimation.length; i++) {

					if (e == tAnimation[i][0].name) {

						mixer.stopAllAction(); // is fixed?
						mixer.clipAction(tAnimation[i][0]).play();
						break
					}
				}
			} else mixer.stopAllAction();

		});

		changeHelmet.onChange(function(e) { self.UpdateModel(e, 'helmet'); });
		changeBack.onChange(function(e) { self.UpdateModel(e, 'back'); });
		changeMask.onChange(function(e) { self.UpdateModel(e, 'mask'); });
		changeTorso.onChange(function(e) { self.UpdateModel(e, 'torso'); });
		changeLegs.onChange(function(e) { self.UpdateModel(e, 'legs'); });
		changeFeet.onChange(function(e) { self.UpdateModel(e, 'feet'); });

		//LOAD START CHARACTERS
		self.UpdateModel('Male', 'head');
		self.UpdateModel('Sneakers', 'feet');
		self.UpdateModel('TShirt', 'torso');
		self.UpdateModel('Pants', 'legs');
		self.UpdateModel('Male', 'neck');

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

	dispose(data) {

		if (data.type == 'LOD') {

			for (let i = 0; i < data.children.length; i++) {

				data.children[i].geometry.dispose();

				if (Array.isArray(data.children[i].material)) {

					for (let j = 0; j < data.children[i].material.length; j++) data.children[i].material[j].dispose();

				} else data.children[i].material.dispose();
			}

			data.clear();
		} else {

			console.log(data);
		}
	}

	UpdateModel(name, type) {

		const scope = this;

		if (name === 'none') {

			if (tCharacter[type] != null) {

				animGroup.remove(tCharacter[type]);
				animGroup.uncache(tCharacter[type]);
				_scene.remove(tCharacter[type]);
				scope.dispose(tCharacter[type]); // testing cleaning memory
			}

			tCharacter[type] = null;
			return;
		}

		let Tchar = null;

		switch(type) {

			case 'helmet':
				Tchar = CHARACTERS.HELMET;
				break;

			case 'mask':
				Tchar = CHARACTERS.MASK;
				break;

			case 'head':
				Tchar = CHARACTERS.HEAD;
				break;

			case 'neck':
				Tchar = CHARACTERS.NECK;
				break;

			case 'torso':
				Tchar = CHARACTERS.TORSO;
				this.UpdateModel(Tchar[name].TypeHands, 'hands'); //load hand as type torso
				break;

			case 'hands':
				Tchar = CHARACTERS.HANDS;
				break;

			case 'legs':
				Tchar = CHARACTERS.LEGS;
				break;

			case 'back':
				Tchar = CHARACTERS.BACK;
				break;

			case 'feet':
				Tchar = CHARACTERS.FEET;
				break;
		}

		let urlTex;
		if (Tchar[name].texture != undefined) urlTex = Tchar[name].texture; else urlTex = TEXTURES;

		if (Tchar[name].LOD) {

			loaderPSK.loadAndLOD({url: Tchar[name].file, PathMaterials: MATERIALS, LOD: Tchar[name].LOD, type: type} , function(geometry, textures, info, skeleton, LOD) {

				const _type = info.type;

				if (tCharacter[_type] != null) {

					animGroup.remove(tCharacter[_type]);
					animGroup.uncache(tCharacter[_type]);
					_scene.remove(tCharacter[_type]);
					scope.dispose(tCharacter[type]);
				}

				tCharacter[_type] = null;

				if (tCharacter.skeleton == null && _type !== 'head') tCharacter.skeleton = skeleton;
				if (_type === 'head') tCharacter.skeletonHead = skeleton;

				let materials = [];
				for (let i = 0; i < textures.length; i++) {
		
					if (textures[i].Diffuse == null) break;
					const texture = new THREE.TextureLoader().load(`${urlTex}${textures[i].Diffuse}.png`);
					texture.wrapS = THREE.RepeatWrapping;
					texture.wrapT = THREE.RepeatWrapping;
					materials.push(new THREE.MeshBasicMaterial({map: texture, wireframe: false, side: THREE.DoubleSide}));
				}

				const l = LOD.reverse();
				l.push(geometry);
				tCharacter[_type] = new THREE.LOD();
				let distance = 350;

				for (let i = l.length - 1; i >= 0; i--) {

					const LMesh = new THREE.SkinnedMesh(l[i], materials);
					LMesh.name = _type;

					if (_type === "head") {

						LMesh.add(tCharacter.skeletonHead.bones[0]);
						LMesh.updateMatrix();
						LMesh.matrixAutoUpdate = false;

						if (tCharacter.matrixHead == null) {

							LMesh.bind(tCharacter.skeletonHead);
							tCharacter.matrixHead = LMesh.bindMatrix;
						} else {

							LMesh.bind(tCharacter.skeletonHead, tCharacter.matrixHead);
						}
					} else {

						LMesh.add(tCharacter.skeleton.bones[0]);
						LMesh.updateMatrix();
						LMesh.matrixAutoUpdate = false;

						if (tCharacter.matrix == null) {

							LMesh.bind(tCharacter.skeleton);
							tCharacter.matrix = LMesh.bindMatrix;
						} else {

							LMesh.bind(tCharacter.skeleton, tCharacter.matrix);
						}
					}
					tCharacter[_type].addLevel(LMesh, distance);
					distance += 50;
				}

				_scene.add(tCharacter[_type]);
				animGroup.add(tCharacter[_type].children[0]);
			});

		} else {

			loaderPSK.load({url: Tchar[name].file, PathMaterials: MATERIALS, type: type}, function(geometry, textures, info, skeleton) {

				const _type = info.type;

				if (tCharacter[_type] != null) {

					animGroup.remove(tCharacter[_type]);
					animGroup.uncache(tCharacter[_type]);
					_scene.remove(tCharacter[_type]);
					scope.dispose(tCharacter[type]);
				}

				tCharacter[_type] = null;

				if (tCharacter.skeleton == null && _type !== 'head') tCharacter.skeleton = skeleton;
				if (_type === 'head') tCharacter.skeletonHead = skeleton;

				let materials = [];
				for (let i = 0; i < textures.length; i++) {
		
					if (textures[i].Diffuse == null) break;
					const texture = new THREE.TextureLoader().load(`${urlTex}${textures[i].Diffuse}.png`);
					texture.wrapS = THREE.RepeatWrapping;
					texture.wrapT = THREE.RepeatWrapping;
					materials.push(new THREE.MeshBasicMaterial({map: texture, wireframe: false, side: THREE.DoubleSide}));
				}

				tCharacter[_type] = new THREE.SkinnedMesh(geometry, materials);
				tCharacter[_type].name = _type;

				if (_type === "head") {

					//LMesh.add(tCharacter.skeletonHead.bones[0]);
					//LMesh.updateMatrix();
					//LMesh.matrixAutoUpdate = false;

					//if (tCharacter.matrixHead == null) {

					//	LMesh.bind(tCharacter.skeletonHead);
					//	tCharacter.matrixHead = LMesh.bindMatrix;
					//} else {

					//	LMesh.bind(tCharacter.skeletonHead, tCharacter.matrixHead);
					//}
				} else {

					tCharacter[_type].add(tCharacter.skeleton.bones[0]);
					tCharacter[_type].updateMatrix();
					tCharacter[_type].matrixAutoUpdate = false;

					if (tCharacter.matrix == null) {

						tCharacter[_type].bind(tCharacter.skeleton);
						tCharacter.matrix = tCharacter[_type].bindMatrix;
					} else {

						tCharacter[_type].bind(tCharacter.skeleton, tCharacter.matrix);
					}
				}

				_scene.add(tCharacter[_type]);
				animGroup.add(tCharacter[_type]);
			});
		}
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