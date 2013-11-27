var container;

var camera, scene, renderer, clock;

var flamingo;

var movePos = 0;

var stepAngle = Math.PI / 18;

var speed = 1;

var loader = new THREE.JSONLoader();
loader.load("models/pink/flamingo.js" , function(geometry) {
    
    
    createFlamingo(geometry);
    init();
    animate();

});

function createFlamingo(geometry) {
    
    if (geometry.morphColors && geometry.morphColors.length) {

        var colorMap = geometry.morphColors[ 0 ];

        for (var i = 0; i < colorMap.colors.length; i++) {

            geometry.faces[ i ].color = colorMap.colors[ i ];

        }

    }
    var material = new THREE.MeshLambertMaterial({color: 0xF38BD2, morphTargets: true, vertexColors: THREE.FaceColors});

    flamingo = new THREE.MorphAnimMesh(geometry, material);
    flamingo.position.set(0, 40, 0);
    flamingo.scale.set(0.5, 0.5, 0.5);

    flamingo.speed = 500;
    flamingo.duration = 1000;
    flamingo.time = 600 * Math.random();

}

function init() {

    container = document.getElementById('container');

    // Camera
    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.y = 100;
    camera.position.z = 400;
    
    // Scene
    scene = new THREE.Scene();
    
    // Clock
    var clock = new THREE.Clock;
    
    // Grid
    var size = 140, step = 10;

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0x303030 } );

    for ( var i = - size; i <= size; i += step ) {

            geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
            geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );

            geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
            geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );

    }

    var line = new THREE.Line( geometry, material, THREE.LinePieces );
    scene.add( line );
    
    // flamingo
    scene.add(flamingo);

    
    
    // Lights
    //var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
    //scene.add( particleLight );
    
    scene.add( new THREE.AmbientLight( 0xcccccc ) );
    
    var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    //var pointLight = new THREE.PointLight( 0xffffff, 4 );
    //pointLight.position = particleLight.position;
    //scene.add( pointLight );
    
    
    
    // RENDER ENGINE
    renderer = new THREE.WebGLRenderer({antialias: false, alpha: false});
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.gammaInput = true;
    //renderer.gammaOutput = true;
    //renderer.physicallyBasedShading = true;

    container.appendChild(renderer.domElement);


    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {
    requestAnimationFrame( animate );
    render();

}

function render() {
    
    flamingo.translateOnAxis( new THREE.Vector3( 0, 0, 1 ), speed / 10 );
    camera.lookAt( flamingo.position );
    renderer.render(scene, camera);

}

window.onkeydown = function (e) {
    
    var code = e.keyCode ? e.keyCode : e.which;
    
    // a
    if( code  == 65 ){
        movePos++;
        flamingo.updateAnimation( movePos );
        speed += 0.2;
    } else if (code === 38) { //up key
        //flamingo.translateOnAxis( new THREE.Vector3( 0, 0, 1 ), 10 );
        flamingo.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), stepAngle );
    } else if (code === 40) { //down key
        //flamingo.translateOnAxis( new THREE.Vector3( 0, 0, 1 ), -10 );
        flamingo.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), -stepAngle );
    }else if (code === 37) { //left key
       flamingo.rotateOnAxis( new THREE.Vector3( 0, 0, 1 ), -stepAngle );
    }else if (code === 39) { //right key
       flamingo.rotateOnAxis( new THREE.Vector3( 0, 0, 1 ), stepAngle );
    }
    
};