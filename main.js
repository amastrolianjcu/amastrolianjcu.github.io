//create and initialize the Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//create a renderer that grabs the HTML canvas to render on
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

//set the canvas size and camera position
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth/1.5,window.innerHeight/1.5);
camera.position.setZ(140);
camera.position.setY(40);

//pass the camera and scene info to the renderer
renderer.render(scene, camera);

//construct a texture loader to hand the texture for the pyramids
const pyramidTexture = new THREE.TextureLoader().load('pyramid.jpeg');

//combine shape and textures to create first pyramid
const pyramid = new THREE.Mesh(
new THREE.ConeGeometry( 50, 40, 4, 64),
new THREE.MeshStandardMaterial( {map: pyramidTexture} )
);
pyramid.position.set(0,10,0);

//combine shape and textures to create second pyramid
const pyramid2 = new THREE.Mesh(
    new THREE.ConeGeometry( 25, 20, 4, 64),
    new THREE.MeshStandardMaterial( {map: pyramidTexture} )
);
pyramid2.position.set(-50,0,-65);

//combine shape and textures to create third pyramid
const pyramid3 = new THREE.Mesh(
    new THREE.ConeGeometry( 25, 20, 4, 64),
    new THREE.MeshStandardMaterial( {map: pyramidTexture} )
);
pyramid3.position.set(50,0,-65);

//texture loader to handle the sand texture for the ground model
const sandTexture = new THREE.TextureLoader().load('sand.jpeg');

//combine shape and texture to create the ground model
const ground= new THREE.Mesh(
new THREE.BoxGeometry(175,4,200),
new THREE.MeshStandardMaterial( {map:sandTexture} )
);
ground.position.set(0,-12,0);

//texture loader for handling brick walkway texture
const walkwayTexture = new THREE.TextureLoader().load('walkway.jpg');

//combine shape and texture for walkway 
const walkway= new THREE.Mesh(
    new THREE.BoxGeometry(25,1,60),
    new THREE.MeshStandardMaterial( {map:walkwayTexture} )
);
walkway.position.set(0,-10,67)

//texture loader for the sky texture and setting the background as the sky texture
const skyTexture = new THREE.TextureLoader().load('sky.jpg');
scene.background = skyTexture;

//constructing light source and adding it to the scene
const light = new THREE.HemisphereLightProbe(0xffffff, 0.75);
scene.add( light );

//adding objects in the scene to a group for easier manipulation 
const group = new THREE.Group();
group.add(pyramid);
group.add(pyramid2);
group.add(pyramid3);
group.add(ground);
group.add(walkway);

//adding group of objects to the scene
scene.add(group);

//pulling button IDs from html and storing in vars
var rotate = document.getElementById('rotate');
var ZoomIn = document.getElementById('ZoomIn');
var ZoomOut = document.getElementById('ZoomOut');

//function that constatly animates changes to the scene
function animate(){
    requestAnimationFrame(animate);

    //rotating pyramids so they are facing the camera
    pyramid.rotation.y =.8;
    pyramid2.rotation.y =.8;
    pyramid3.rotation.y =.8;

    //onclick function to listen for button click and zoom in
    ZoomIn.onclick=function(){
        camera.fov -= 1;
        camera.updateProjectionMatrix();
    }

    //onclick function to listen for button click and zoom out
    ZoomOut.onclick=function(){
        camera.fov += 1;
        camera.updateProjectionMatrix();
    }

    //storing camera positions in variables
    z = camera.position.z;
    x = camera.position.x;

    //if checked function that allows for rotating the model
    if (rotate.checked==true){
        camera.lookAt(0, 0, 0);
        camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001);
        camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001);
    }    
    
    //calling our renderer function to render object on canvas 
    renderer.render(scene, camera);
}

//animate that constatly refreshes renderer with new changes
animate()