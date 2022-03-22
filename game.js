//import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
//import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
console.log('inicializacion')

const scene = new THREE.Scene();
scene.background=new THREE.Color('#c2d1f0')
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z=5;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor('#e5e5e5')
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
window.addEventListener('resize',() =>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})
//aqui las luces
const light1= new THREE.PointLight(0xFFFFFF,1,300);
light1.position.set(10,0,25);
scene.add(light1);
//-------

const light2= new THREE.PointLight(0xFFFFFF,1,300);
light2.position.set(-10,5,-25);
scene.add(light2);
//aqui los controles
const controls = new OrbitControls(camera,renderer.domElement);
controls.minDistance=2.5;
controls.maxDistance=10;

//coordenadas
const axesHelper = new THREE.AxesHelper( 2 );
scene.add( axesHelper );
// otro objeto pero importado de licuadora
const loader = new GLTFLoader();
loader.load( 'cohete.glb', function ( gltf ) {
    const coheteMesh = gltf.scene.children.find((child) => child.name === "cohete");
    coheteMesh.position.y = 0;
    coheteMesh.position.z = 0;
    coheteMesh.rotation.z = 0;
    scene.add(coheteMesh)
})

//aqui el objeto1
const geometry1 = new THREE.SphereGeometry( 0.1, 4, 4);
const material1= new THREE.MeshPhongMaterial({color:0x94daf});
const mesh1 = new THREE.Mesh(geometry1,material1);
mesh1.position.set(0,0,0)
mesh1.rotation.y += -3;
scene.add(mesh1);
//animacion del objeto1
const render=function(){
    requestAnimationFrame(render);
    //mesh1.rotation.x += 0.04;
    mesh1.rotation.y +=0.01;
    renderer.render(scene,camera);
}

//aqui el objeto 2-----
const geometry = new THREE.SphereGeometry( 0.5, 64, 64);
const material = new THREE.MeshPhongMaterial()

//cargar mapa de desplazamiento
const displacementMap = new THREE.TextureLoader().load('earthbump.jpeg')
material.displacementMap = displacementMap

//cargar textura
const texture = new THREE.TextureLoader().load('earthmap1k.jpeg')
material.map = texture;
material.bumpScale = 0.015
const mesh = new THREE.Mesh(geometry, material);
material.roughnessMap=0.1;
mesh.position.set(1.5,-0.5,0)
mesh.rotation.z = 15;
mesh1.add(mesh);

//cargar otra esfera sobre la tierra nubes
const cloudGeometry = new THREE.SphereGeometry(0.53, 32, 32);
// material nubes
const cloudMaterial = new THREE.TextureLoader().load('earthCloud.png')
//cloudMetarial.transparent=true;
// mesh nubes
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);
//cargar otra esfera de las constelaciones

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);
// galaxy material
const starMaterial = new THREE.TextureLoader().load('galaxy.png')
// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);


//aqui el render
render();




