/* SCENE ...
******************************************************/
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha : false });
renderer.setSize(width, height);
renderer.domElement.style.position = "relative";
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);
 
var scene = new THREE.Scene;


/* RENDER
******************************************************/
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(200, 300, -400);
scene.add(pointLight);

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

camera.position.y = 60;
camera.position.z = -400;

scene.add(camera);

/* OBJECTS
******************************************************/

function addPlane(geometry, x, y, z, scale) {
    
    if ( geometry.morphColors && geometry.morphColors.length ) {

            var colorMap = geometry.morphColors[ 0 ];

            for ( var i = 0; i < colorMap.colors.length; i ++ ) {

                    geometry.faces[ i ].color = colorMap.colors[ i ];

            }

    }
    var material = new THREE.MeshLambertMaterial( { color: 0xF38BD2, morphTargets: true, vertexColors: THREE.FaceColors } );
    
    plane = new THREE.MorphAnimMesh( geometry, material );
    plane.position.set(x, y, z);
    plane.scale.set(scale, scale, scale);
    
    plane.speed = 500;
    plane.duration = 1000;
    plane.time = 600 * Math.random();
    
    scene.add(plane);
    
    camera.lookAt(plane.position);
    ready = true;
}





var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xAEE3EB, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
 
scene.add(skybox);


var cubeG = new THREE.CubeGeometry(100, 100, 100);
var cubeM = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
var cube = new THREE.Mesh(cubeG, cubeM);
cube.position.y = -150;
scene.add(cube);



var ready = false;
var plane = false;


var loader = new THREE.JSONLoader();
loader.load("models/pink/flamingo.js", function(geometry, materials) {addPlane(geometry, 0, 0, 0, 1 )});


/* Animation
******************************************************/
var clock = new THREE.Clock;

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    
    if( code  == 65 ){
        
        var STEP = 10;
        var newPlaneMatrix = plane.matrix;        
        newPlaneMatrix.identity();
        //newCubeMatrix.multiplySelf(THREE.Matrix4.rotationYMatrix(cube.rotation.y));
        newPlaneMatrix.multiplySelf(THREE.Matrix4.translationMatrix(plane.position.x, plane.position.y, plane.position.z + STEP));
        plane.updateMatrix();
    }
    
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
   
   if(  ready ) {
        
        delta = clock.getDelta();
        
        //plane.updateAnimation( 1000 * delta );

        //delta.position.x += morph.speed * delta;
        /*
        if ( morph.position.x  > 2000 )  {
            morph.position.x = -1500 - Math.random() * 500;
        }
        */
       renderer.clear();
       renderer.render(scene, camera);
   }
   /*
   var width = window.innerWidth;
   var height = window.innerHeight;
   renderer.setSize(width, height);
   */
   
    
   requestAnimationFrame(render);
}
 
render();

