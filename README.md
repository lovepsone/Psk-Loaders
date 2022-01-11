# Psk-Loaders [EN]
Loader for 3d models of static mesh .pskx and animated mesh .psk for [three.js](https://threejs.org/).

### Documentation
See the base [Loader](https://threejs.org/docs/index.html?q=loa#api/en/loaders/Loader) class for common methods.

#### Methods class PSKLoader
```js
load(Options: Object, onLoad : Function, onProgress : Function, onError : Function)
```
* Options — {url: String, PatchMaterials: String}
    * Options.url - the URL to the file model(*.psk|*.pskx).
    * Options.PatchMaterials - the path to the file materials(*.mat).
* onLoad — Will be called when load completes.
* onProgress — Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .total and .loaded bytes. If the server does not set the Content-Length header; .total will be 0.
* onError — Will be called when load errors.

* Code Example:
```js
const loader = new PSKLoader();

loader.load(
    // resource URL
    {url: './Mesh/example.pskx', PathMaterials: './'},

    // onLoad callback
    function(geometry, materials, skeleton) {

		let mat = [];

		for (let i = 0; i < materials.length; i++) {

            const texture = new THREE.TextureLoader().load(`./${materials[i].Diffuse}.png`);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;

            mat.push(new THREE.MeshBasicMaterial({map: texture}));
        }

        const mesh = new THREE.Mesh(geometry, mat);
	},

    // onProgress callback
	function(xhr) {

		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	},

    // onError callback
	function(error) {

		console.log('An error happened' + error);
	}
```

#### Methods class PSALoader
...in progress

### Examples
...in progress


# Psk-Loaders [RU]
Загрузчик 3д моделей статической сетки .pskx и анимированной сетки .psk для [three.js](https://threejs.org/).

### Документация
Общие методы см. в базовом классе [Loader](https://threejs.org/docs/index.html?q=loa#api/en/loaders/Loader).

#### Методы class PSKLoader
```js
load(Options: Object, onLoad : Function, onProgress : Function, onError : Function)
```
* Options — {url: String, PathMaterials: String}
    * Options.url - URL-адрес файла модели(*.psk|*.pskx).
    * Options.PathMaterials - путь к файлам материалов (*.mat).
* onLoad — Будет вызван после завершения загрузки.
* onProgress — Будет вызываться во время загрузки. Аргументом будет экземпляр XMLHttpRequest, который содержит байты .total и .loaded. Если сервер не устанавливает заголовок Content-Length; .total будет 0.
* onError — Будет вызываться при ошибках.

#### Методы class PSALoader
...in progress

### Примеры
...in progress