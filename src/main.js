import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';


const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth/window.innerHeight,
	0.1,
	1000
);

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00,});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.receiveShadow = true;
box.castShadow = true;


const planeGeometry = new THREE.PlaneGeometry(30, 30);
const PlaneMaterial = new THREE.MeshStandardMaterial({
	color: 0xFFFFFF,
	side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(planeGeometry, PlaneMaterial);
scene.add(plane);
plane.rotation.x = -0.5*Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);


const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
	color: 0x0000FF,
	wireframe: false,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10,10,0);
sphere.castShadow = true;

const ambientlight = new THREE.AmbientLight(0x333333, 20);
scene.add(ambientlight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30,50,0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;



const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);






const gui = new dat.GUI();

const options = {
	sphereColor: '#ffea00',
	wireframe: false,
	speed : 0.01,
}

gui.addColor(options, 'sphereColor').onChange(function(e){
	sphere.material.color.set(e);
})

gui.add(options, 'wireframe').onChange(function(e){
	sphere.material.wireframe = e;
})

gui.add(options, 'speed', 0, 0.1);

let step = 0;

function animate(time){
	box.rotation.x = time/1000;
	box.rotation.y = time/1000;


	step += options.speed;
	sphere.position.y = 10*Math.abs(Math.sin(step));

	renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});