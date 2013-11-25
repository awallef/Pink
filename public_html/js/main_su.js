/* SCENE ...
******************************************************/
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
 
var scene = new THREE.Scene;


/* RENDER
******************************************************/
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(200, 300, 200);
scene.add(pointLight);

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

camera.position.y = 60;
camera.position.z = 400;

scene.add(camera);

/* OBJECTS
******************************************************/
/*var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
 
cube.rotation.y = Math.PI * 45 / 180;
 
scene.add(cube);
*/

function createScene(geometry, materials, x, y, z, scale) {

    plane = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    plane.position.set(x, y, z);
    plane.scale.set(scale, scale, scale);
    //meshes.push(zmesh);
    
    
    plane.rotation.x = Math.PI * -90 / 180;
    /*
    plane.rotation.y = Math.PI * 45 / 180;
    plane.rotation.z = Math.PI * 45 / 180;
    */
    scene.add(plane);
    
    camera.lookAt(plane.position);
    
    ready = true;
}

var loader = new THREE.JSONLoader();
loader.load("models/Su-47_Berkut/three.js", function(geometry, materials) {createScene(geometry, materials, 0, 0, 0, 15 )});


var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xAEE3EB, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
 
scene.add(skybox);

var ready = false;
var plane = false;

/* Animation
******************************************************/
var clock = new THREE.Clock;

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    
    if (code === 38) { //up key
        plane.rotation.x--;
    } else if (code === 40) { //down key
        plane.rotation.x++;
    }else if (code === 37) { //down key
        plane.rotation.y--;
    }else if (code === 39) { //down key
        
        plane.rotation.y++;
    }
};

/* Loop
******************************************************/
function render() {
    
   //cube.rotation.y -= clock.getDelta();
   
   //if(  ready ) plane.rotation.y -= clock.getDelta();
   
   var width = window.innerWidth;
   var height = window.innerHeight;
   renderer.setSize(width, height);
   
   renderer.render(scene, camera);
    
   requestAnimationFrame(render);
}
 
render();

