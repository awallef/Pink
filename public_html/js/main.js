var container;

var camera, scene, renderer;

var flamingo;

init();



function createFlamingo(geometry) {
    
    alert('youpi!');
    
    if (geometry.morphColors && geometry.morphColors.length) {

        var colorMap = geometry.morphColors[ 0 ];

        for (var i = 0; i < colorMap.colors.length; i++) {

            geometry.faces[ i ].color = colorMap.colors[ i ];

        }

    }
    var material = new THREE.MeshLambertMaterial({color: 0xF38BD2, morphTargets: true, vertexColors: THREE.FaceColors});

    flamingo = new THREE.MorphAnimMesh(geometry, material);
    flamingo.position.set(0, 0, 0);
    flamingo.scale.set(1, 1, 1);

    flamingo.speed = 500;
    flamingo.duration = 1000;
    flamingo.time = 600 * Math.random();

    scene.add(flamingo);

    preRender();
}

function preRender(){
    
    //

    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(200, 300, -400);
    scene.add(pointLight);

    //

    renderer = new THREE.WebGLRenderer({antialias: false, alpha: false});
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;

    container.appendChild(renderer.domElement);


    //

    window.addEventListener('resize', onWindowResize, false);
    
    animate();
}

function init() {

    container = document.getElementById('container');

    //

    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.z = 400;

    scene = new THREE.Scene();


    var loader = new THREE.JSONLoader();
    loader.load("models/pink/flamingo.js" , function(geometry) {
        createFlamingo(geometry);
    });


}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    renderer.render(scene, camera);

}