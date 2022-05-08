const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth/1.5,window.innerHeight/1.5);
camera.position.setZ(140);
camera.position.setY(40);

renderer.render(scene, camera);

const pyramidTexture = new THREE.TextureLoader().load('pyramid.jpeg');

const pyramid = new THREE.Mesh(
new THREE.ConeGeometry( 50, 40, 4, 64),
new THREE.MeshStandardMaterial( {map: pyramidTexture} )
);
pyramid.position.set(0,10,0);


const pyramid2 = new THREE.Mesh(
    new THREE.ConeGeometry( 25, 20, 4, 64),
    new THREE.MeshStandardMaterial( {map: pyramidTexture} )
);
pyramid2.position.set(-50,0,-65);

const pyramid3 = new THREE.Mesh(
    new THREE.ConeGeometry( 25, 20, 4, 64),
    new THREE.MeshStandardMaterial( {map: pyramidTexture} )
);
pyramid3.position.set(50,0,-65);

const sandTexture = new THREE.TextureLoader().load('sand.jpeg');

const ground= new THREE.Mesh(
new THREE.BoxGeometry(175,4,200),
new THREE.MeshStandardMaterial( {map:sandTexture} )
);
ground.position.set(0,-12,0);

const walkwayTexture = new THREE.TextureLoader().load('walkway.jpg');

const walkway= new THREE.Mesh(
    new THREE.BoxGeometry(25,1,60),
    new THREE.MeshStandardMaterial( {map:walkwayTexture} )
);
walkway.position.set(0,-10,67)

const skyTexture = new THREE.TextureLoader().load('sky.jpg');
scene.background = skyTexture;

const light = new THREE.AmbientLightProbe(0xffffff, 0.75);
scene.add( light );


const group = new THREE.Group();
group.add(pyramid);
group.add(pyramid2);
group.add(pyramid3);
group.add(ground);
group.add(walkway);

scene.add(group);

var rotate = document.getElementById('rotate');

function animate(){
    requestAnimationFrame(animate);

    pyramid.rotation.y =.8;
    pyramid2.rotation.y =.8;
    pyramid3.rotation.y =.8;
    z = camera.position.z;
    x = camera.position.x;
    if (rotate.checked==true){
        camera.lookAt(0, 0, 0);
        camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001);
        camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001);
    }    
    
    renderer.render(scene, camera);
}

animate()