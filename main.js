const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(50);

renderer.render(scene, camera);

const pyramidTexture = new THREE.TextureLoader().load('pyramid.jpg');

const pyramid = new THREE.Mesh(
new THREE.ConeGeometry( 20, 15, 4, 64),
new THREE.MeshStandardMaterial( {map: pyramidTexture} )
);
scene.add( pyramid );

const sandTexture = new THREE.TextureLoader().load('sand.jpg');

const ground= new THREE.Mesh(
new THREE.PlaneGeometry(70,50, 30, 30),
new THREE.MeshStandardMaterial( {map:sandTexture} )
);
scene.add( ground );
ground.position.set(0,-10,0);

const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);
pointLight.position.set(20,20,20);

//const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    requestAnimationFrame(animate);

    pyramid.rotation.y =0.5;
    ground.rotation.x = 5;

    renderer.render(scene, camera);
}

animate()