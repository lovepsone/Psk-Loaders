/*
* @author lovepsone 2019 - 2021
*/

import * as THREE from './../libs/three.module.js';
import {PSKLoader} from './../src/PSKLoader.js';
import {PSALoader} from './../src/PSALoader.js';
import {CameraControls} from './CameraControls.js';
import {GUI} from './lil-gui.module.min.js';
import {CHARACTERS} from './confModel.js';

let _renderer, _camera, _scene, mixer = null, _controls = null;
const loaderPSK = new PSKLoader(), loaderPSA = new PSALoader(), clock = new THREE.Clock();
let tCharacter = {'helmet': null, 'head': null, 'mask': null, 'neck': null, 'torso': null, 'hands': null, 'legs': null, 'back': null, 'feet': null};
let tSkeleton = {'helmet': null, 'head': null, 'mask': null, 'neck': null, 'torso': null, 'hands': null, 'legs': null, 'back': null, 'feet': null, 'skeleton': null};
const animGroup = new THREE.AnimationObjectGroup();
const MATERIALS = './Game/Characters/Materials/';
const TEXTURES = './Game/Characters/Textures/';
let tAnimation;

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
		const changeHelmet = fCharacters.add({Helmet: 'none'}, 'Helmet').options(['none', 'Medium', 'Heavy', 'Biker', 'Military1', 'Military2', 'Military3', 'Stalker', 'Bandit', 'Edge', 'Casual']);
		const changeMask = fCharacters.add({Mask: 'none'}, 'Mask').options(['none', 'Military', 'MilitaryRespirator', 'RespiratorMK1', 'RespiratorMK2']);
		const changeTorso = fCharacters.add({Torso: 'TShirt'}, 'Torso').options(['TShirt', 'HazmatMK1', 'HazmatMK2', 'HazmatMK3', 'Heavy', 'Jacket1', 'Jacket2', 'JacketEdge1', 'JacketEdge2', 'JacketMilitary1', 'JacketMilitary2', 'JacketStalker1', 'JacketStalker2', 'Light', 'Medium']);
		const changeLegs = fCharacters.add({Legs: 'Pants'}, 'Legs').options(['Pants', 'Heavy', 'Light', 'Medium', 'Bandit1', 'Bandit2', 'Edge1', 'Edge2', 'Military1', 'Military2', 'Military3', 'Stalker1', 'Stalker2']);
		const changeBack = fCharacters.add({Back: 'none'}, 'Back').options(['none', 'Small', 'Medium', 'Large', 'OxygenMK1', 'OxygenMK2', 'OxygenMK3']);
		const changeFeet = fCharacters.add({Feet: 'Sneakers'}, 'Feet').options(['Sneakers', 'Stalker2', 'Stalker1', 'Military2', 'Military1', 'Edge2', 'Edge1', 'Bandit']);

		loaderPSA.load(
			'./Game/Characters/Animations/FirstPerson/FreeHands/FP_MOB1_Idle_Loop.psa',
			'./Game/Characters/Animations/FirstPerson/FreeHands/FP_MOB1_Idle_Loop.config',
			function(anims) {

				tAnimation = anims;
					//mixer = new THREE.AnimationMixer(animGroup);
					//mixer.clipAction(anims[0]).play();
		});

		const FAnim = panel.addFolder('Animation');
		const changeAnim = FAnim.add({Anim: 'none'}, 'Anim').options(['none', 'test']);
		changeAnim.onChange(function(e) { 

			if (mixer == null) mixer = new THREE.AnimationMixer(animGroup);
			if (e === 'test') {

				mixer.clipAction(tAnimation[0]).play();
			} else mixer.stopAllAction();

			console.log(e);
		});

		changeHelmet.onChange(function(e) { self.UpdateModel(e, 'helmet'); });
		changeBack.onChange(function(e) { self.UpdateModel(e, 'back'); });
		changeMask.onChange(function(e) { self.UpdateModel(e, 'mask'); });
		changeTorso.onChange(function(e) { self.UpdateModel(e, 'torso'); });
		changeLegs.onChange(function(e) { self.UpdateModel(e, 'legs'); });
		changeFeet.onChange(function(e) { self.UpdateModel(e, 'feet'); });

		//LOAD START CHARACTERS
		this.UpdateModel('Sneakers', 'feet');
		this.UpdateModel('TShirt', 'torso');
		this.UpdateModel('Pants', 'legs');
		this.UpdateModel('Male', 'neck');
		this.UpdateModel('Male', 'head');

		window.addEventListener('resize', this.onRenderResize);

	}

	UpdateModel(name, type) {

		if (tCharacter[type] != null) {

			tCharacter[type].skeleton.dispose();
			animGroup.remove(tCharacter[type]);
			animGroup.uncache(tCharacter[type]);
			_scene.remove(tCharacter[type]);
		}

		tCharacter[type] = null;

		if (name === 'none') return;

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

		loaderPSK.load({url: Tchar[name].file, PathMaterials: MATERIALS}, function(geometry, textures, urlMaterial, skeleton) {

			let materials = [];
			for (let i = 0; i < textures.length; i++) {
	
				if (textures[i].Diffuse == null) break;
				const texture = new THREE.TextureLoader().load(`${urlTex}${textures[i].Diffuse}.png`);
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				materials.push(new THREE.MeshBasicMaterial({map: texture, wireframe: false, side: THREE.DoubleSide}));
			}

			let matrix = null;
			if (tSkeleton['head'] != null) {

				tSkeleton[type] = tSkeleton['head'];
				matrix = tCharacter['head'].bindMatrix;
			}

			if (tSkeleton[type] == null)  tSkeleton[type] = skeleton;
			if (tSkeleton['head'] != null) tSkeleton[type] = tSkeleton['head'];

			tCharacter[type] = new THREE.SkinnedMesh(geometry, materials);
			tCharacter[type].name = type;
			tCharacter[type].add(tSkeleton[type].bones[0]);
			if (matrix != null) tCharacter[type].bind(tSkeleton[type], matrix); else tCharacter[type].bind(tSkeleton[type]);
			_scene.add(tCharacter[type]);
			animGroup.add(tCharacter[type]);

			if (type == 'head') {

				const skeletonHelper = new THREE.SkeletonHelper(tCharacter[type]);
				_scene.add(skeletonHelper);
			}

		});
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