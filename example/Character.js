/*
* @author lovepsone 2019 - 2024
*/

import * as THREE from './../libs/three.module.js';
import {PSKLoader} from './../src/PSKLoader.js';
import {PSALoader} from './../src/PSALoader.js';
import {CHARACTERS} from './confModel.js';
import {ANIMATIONS} from './confAnims.js';

//import {CCDIKSolver, CCDIKHelper} from './CCDIKSolver.js';

const loaderModel = new PSKLoader(), loaderAnimations = new PSALoader(), MATERIALS = './Game/Characters/Materials/', TEXTURES = './Game/Characters/Textures/';
const AnimationGroup = new THREE.AnimationObjectGroup();

let struct = {
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

let _scene = null, LodDistance = 300, Animations = null, skeletonHelper = null;

const tHead = new THREE.AnimationObjectGroup();

class Character {

    constructor(scene) {

		_scene = scene;
		this.LoadModel();
		this.loadAnimations();
    }

    LoadModel() {

        //LOAD START CHARACTERS - test version
		this.UpdateModel('Male', 'head');
		this.UpdateModel('Sneakers', 'feet');
		this.UpdateModel('TShirt', 'torso');
		this.UpdateModel('Pants', 'legs');
		this.UpdateModel('Male', 'neck');
    }

    UpdateModel(name, type) {

        const scope = this;
		let Tchar = null, urlTexture;

		// требуется оптимизация кода, ибо повтаряемся
		if (name === 'none') {

			if (struct[type] != null) {

				AnimationGroup.remove(struct[type]);
				AnimationGroup.uncache(struct[type]);
				_scene.remove(struct[type]);
				scope.dispose(struct[type]);
			}

			struct[type] = null;
			return;
		}

		switch(type) {

			case 'helmet': Tchar = CHARACTERS.HELMET; break;
			case 'mask': Tchar = CHARACTERS.MASK; break;
			case 'head': Tchar = CHARACTERS.HEAD; break;
			case 'neck': Tchar = CHARACTERS.NECK; break;
			case 'torso': Tchar = CHARACTERS.TORSO;
				this.UpdateModel(Tchar[name].TypeHands, 'hands'); //load hand as type torso
				break;
			case 'hands': Tchar = CHARACTERS.HANDS; break;
			case 'legs': Tchar = CHARACTERS.LEGS; break;
			case 'back': Tchar = CHARACTERS.BACK; break;
			case 'feet': Tchar = CHARACTERS.FEET; break;
		}

		if (Tchar[name].texture != undefined) urlTexture = Tchar[name].texture; else urlTexture = TEXTURES;

		if (Tchar[name].LOD) {

			loaderModel.loadAndLOD({url: Tchar[name].file, PathMaterials: MATERIALS, LOD: Tchar[name].LOD, type: type} , function(geometry, textures, info, skeleton, LOD) {

				const _type = info.type, lodGeometry = LOD.reverse();

				if (struct[_type] != null) {

					AnimationGroup.remove(struct[_type]);
					AnimationGroup.uncache(struct[_type]);
					_scene.remove(struct[_type]);
					scope.dispose(struct[type]);
				}

				struct[_type] = null;

				if (struct.skeleton == null && _type !== 'head') struct.skeleton = skeleton;
				if (_type === 'head') struct.skeletonHead = skeleton;

				let materials = [];
				for (let i = 0; i < textures.length; i++) {
		
					if (textures[i].Diffuse == null) break;
					const texture = new THREE.TextureLoader().load(`${urlTexture}${textures[i].Diffuse}.png`);
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					materials.push(new THREE.MeshBasicMaterial({map: texture, wireframe: false, side: THREE.DoubleSide}));
				}

				lodGeometry.push(geometry);
				lodGeometry.reverse();
				struct[_type] = new THREE.LOD();
				struct[_type].name = _type;

				for (let i = lodGeometry.length - 1; i >= 0; i--) {

					const LMesh = new THREE.SkinnedMesh(lodGeometry[i], materials);
					LMesh.name = _type;

					/*LMesh.add(skeleton.bones[0]);
					LMesh.updateMatrix();
					LMesh.matrixAutoUpdate = false;
					LMesh.bind(skeleton);
					if (_type === "head") scope.setHelperSkelet(LMesh);

					struct[_type].addLevel(LMesh, LodDistance + i * 50);
					struct[_type].updateMatrix();
					struct[_type].matrixAutoUpdate = false;*/

					if (_type === "head") {

						LMesh.add(struct.skeletonHead.bones[0]);
						LMesh.updateMatrix();
						LMesh.matrixAutoUpdate = false;

						if (struct.matrixHead == null) {

							LMesh.bind(struct.skeletonHead);
							struct.matrixHead = LMesh.bindMatrix;
						} else LMesh.bind(struct.skeletonHead, struct.matrixHead);

						scope.setHelperSkelet(LMesh);

					} else {

						LMesh.add(struct.skeleton.bones[0]);
						LMesh.updateMatrix();
						LMesh.matrixAutoUpdate = false;

						if (struct.matrix == null) {

							LMesh.bind(struct.skeleton);
							struct.matrix = LMesh.bindMatrix;
						} else LMesh.bind(struct.skeleton, struct.matrix);
					}
					struct[_type].addLevel(LMesh, LodDistance + i*50);
					struct[_type].updateMatrix();
					struct[_type].matrixAutoUpdate = false;
				}

				_scene.add(struct[_type]);
				AnimationGroup.add(struct[_type].children[0]);
			});

		} else {

			loaderModel.load({url: Tchar[name].file, PathMaterials: MATERIALS, type: type}, function(geometry, textures, info, skeleton) {

				const _type = info.type;

				if (struct[_type] != null) {

					AnimationGroup.remove(struct[_type]);
					AnimationGroup.uncache(struct[_type]);
					_scene.remove(struct[_type]);
					scope.dispose(struct[type]);
				}

				struct[_type] = null;

				if (struct.skeleton == null && _type !== 'head') struct.skeleton = skeleton;
				if (_type === 'head') struct.skeletonHead = skeleton;

				let materials = [];
				for (let i = 0; i < textures.length; i++) {
		
					if (textures[i].Diffuse == null) break;
					const texture = new THREE.TextureLoader().load(`${urlTexture}${textures[i].Diffuse}.png`);
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					materials.push(new THREE.MeshBasicMaterial({map: texture, wireframe: false, side: THREE.DoubleSide}));
				}

				struct[_type] = new THREE.SkinnedMesh(geometry, materials);
				struct[_type].name = _type;

				/*struct[_type].add(skeleton.bones[0]);
				struct[_type].updateMatrix();
				struct[_type].matrixAutoUpdate = false;
				struct[_type].bind(skeleton);*/

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

					struct[_type].add(skeleton.bones[0]);
					struct[_type].updateMatrix();
					struct[_type].matrixAutoUpdate = false;
					struct[_type].bind(skeleton);
				} else {

					struct[_type].add(skeleton[0]);
					struct[_type].updateMatrix();
					struct[_type].matrixAutoUpdate = false;

					if (struct.matrix == null) {

						struct[_type].bind(skeleton);
						struct.matrix = struct[_type].bindMatrix;
					} else {

						struct[_type].bind(skeleton, struct.matrix);
					}
				}

				_scene.add(struct[_type]);
				AnimationGroup.add(struct[_type]);
			});
		}
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

			// вычестить если не лод объект, иначе висит в памяти
			console.log(data);
		}
	}

	loadAnimations() {

		loaderAnimations.loadList(ANIMATIONS.InPlace, function(anims) {

			Animations = anims;
		});
	}

	getAnimationGroup() {

		return AnimationGroup;
	}

	getAnimations() {

		return Animations;
	}

	UpdataHead() {

		if (struct['head'] && struct['neck']) {

			struct['head'].children[0].skeleton.bones[50].position.copy(struct['neck'].children[0].skeleton.bones[50].position);
			struct['head'].children[0].skeleton.bones[50].quaternion.copy(struct['neck'].children[0].skeleton.bones[50].quaternion);
		}
	}

	setHelperSkelet(mesh, isVisible = false) {

		if (skeletonHelper == null) {

			skeletonHelper = new THREE.SkeletonHelper(mesh);
			skeletonHelper.visible = isVisible;
			_scene.add(skeletonHelper);
		} else skeletonHelper.visible = isVisible;
	}

	getDataCharacters() {

		return struct;
	}
}

export {Character};