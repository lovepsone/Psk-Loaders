/*
* @author lovepsone 2019 - 2021
*/

import {MainEngenie} 				from './Main.js';

const Engenie = new MainEngenie(60, window.innerWidth, window.innerHeight);
const container = document.getElementById('Window');
container.appendChild(Engenie.getRender().domElement);

let AnimationFrame = function(frame) {

	requestAnimationFrame(AnimationFrame);
	Engenie.Render(frame);

};

AnimationFrame();