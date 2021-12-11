import * as THREE from './three.js/build/three.module.js';
import { OrbitControls } from './three.js/lib/jsm/controls/OrbitControls.js';
const LOGO_SIZE = 400;
let container;
let camera, scene, renderer;
let geometry, material, mesh;
let geoArray,speedArray,colorArray,ratioArray;
let moveStart = false;
function init() {
    renderer = new THREE.WebGLRenderer();
    if (renderer.capabilities.isWebGL2 === false && renderer.extensions.has('ANGLE_instanced_arrays') === false) {
        document.getElementById('notSupported').style.display = '';
        return false;
    }
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(50, LOGO_SIZE / LOGO_SIZE, 1, 5000);
    camera.position.z = 1400;
    scene = new THREE.Scene();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(LOGO_SIZE, LOGO_SIZE);
    // controls
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1000;
    controls.maxDistance = 5000;
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize);
    container.addEventListener('mousedown',onMouseDown);
    container.addEventListener('mousemove',onMouseMove);
    container.addEventListener('mouseup',onMouseUp);
    return true;
}

function onMouseDown(e){
    // moveStart = true;
}
function onMouseMove(e){

}
function onMouseUp(e){

}

function onWindowResize() {

    camera.aspect = LOGO_SIZE / LOGO_SIZE;
    camera.updateProjectionMatrix();

    renderer.setSize(LOGO_SIZE, LOGO_SIZE);

}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    const time = performance.now() * 0.0005;
    const object = scene.children[0];
    if(object) {
        object.material.uniforms["time"].value = time * 5;
        renderer.render(scene, camera);
    }
}

function parseColor(colorsArray){

    return colorsArray.map(colorString=>{
        const Red =  parseInt("0x"+colorString.slice(1,3))/255.0;
        const Green = parseInt("0x"+colorString.slice(3,5))/255.0;
        const Blue = parseInt("0x"+colorString.slice(5,7))/255.0;

        return {R:Red,G:Green,B:Blue}
    });

}
/*
  ballsCountPerSize: array<{size:number,count:number}>
  ellipseRation: {min:number,max:number}
  speed: {min:number,max:number}
  colorArray: array<string> color format is: '#244232'
  contrast: number
  orbitDirection: boolean true:rightToLeft, false: leftToRight
  coupleOrFollow: boolean true: couple to each other, false: follow to each other
 */
window.initBalls = (ballsCountPerSize,ellipseRatio, speed, colorsArray, contrast, orbitDirection, coupleOrFollow)=>{
    const circleGeometry = new THREE.CircleGeometry(1, 6);
    geometry = new THREE.InstancedBufferGeometry();
    geometry.index = circleGeometry.index;
    geometry.attributes = circleGeometry.attributes;
    let particleCount = 0;
    geoArray = [];
    speedArray = [];
    colorArray = [];
    ratioArray = [];
    const parsedColorsArray = parseColor(colorsArray);
    ballsCountPerSize.forEach(item=>{

      const count =  item.count;
      for (let i = 0; i < count; i++) {
            const R = Math.pow(Math.random(),1/3);
            const q = Math.random()*2*Math.PI;
            const b = Math.random()*2*Math.PI;
            const size = item.size; // Math.random();
            const color = parsedColorsArray[Math.floor(Math.random()*colorsArray.length)];
            colorArray.push(color.R,color.G,color.B);
            geoArray.push(R,q,b,size);
            const v = (speed.min + (speed.max - speed.min)*Math.random())*(orbitDirection?1:-1);
            speedArray.push(v);
            ratioArray.push(ellipseRatio.min + (ellipseRatio.max - ellipseRatio.min)*Math.random());
     }
    });


    geometry.setAttribute('info', new THREE.InstancedBufferAttribute(new Float32Array(geoArray), 4));
    geometry.setAttribute('color', new THREE.InstancedBufferAttribute(new Float32Array(colorArray), 3));
    geometry.setAttribute('speed', new THREE.InstancedBufferAttribute(new Float32Array(speedArray), 1));
    geometry.setAttribute('ratio', new THREE.InstancedBufferAttribute(new Float32Array(ratioArray), 1));
    material = new THREE.RawShaderMaterial({
        uniforms: {
            "map": {value: new THREE.TextureLoader().load('./circle.png')},
            "time": {value: 0.0},
        },
        vertexShader: `precision highp float;
                            uniform mat4 modelViewMatrix;
                            uniform mat4 projectionMatrix;
                            uniform float time;
                            uniform float scaleValue;
                            attribute vec3 position;
                            attribute vec4 info;
                            attribute vec3 color;
                            attribute float speed;
                            attribute float ratio;
                            attribute vec2 uv;
                            varying vec3 vColor;
                            varying vec2 vUv;
                            void main() {
                            vec3 translate = vec3(info.x*cos(info.y)*cos(info.z+time*speed),info.x*sin(info.y),info.x * cos(info.y) * sin(info.z+time*speed)); 
                            vec4 mvPosition = modelViewMatrix * vec4( translate, 1.0 );
                            float transformX = 1.0;
                            float transformY = 1.0;
                            if(ratio < 1.0)
                               transformX = 1.0/ratio;
                           else
                               transformY =  ratio;
                            mvPosition.xyz += position * info.w * 2.0 * mat3(transformX,0.0,0.0,0.0,transformY,0.0,0.0,0.0,1.0);
                            vUv = uv;
                            vColor = color;
                            gl_Position = projectionMatrix * mvPosition;
                    
                        }`,
        fragmentShader: `precision highp float;
                        uniform sampler2D map;
                        varying vec2 vUv;
                        varying vec3 vColor;
                        void main() {
                        vec4 diffuseColor = texture2D( map, vUv );
                        vec3 color = vec3(vColor);
                        gl_FragColor = vec4( diffuseColor.xyz * color, 1);
                        if ( diffuseColor.w < 0.5 ) discard;
                        }`,
        depthTest: true,
        depthWrite: true
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(500, 500, 500);
    mesh.name = 'balls';
    scene.add(mesh);
}

window.resetParameters = (ballsCountPerSize,ellipseRatio, speed, colorArray, contrast, orbitDirection, coupleOrFollow) =>{
    var balls = scene.getObjectByName('balls');
    scene.remove(balls);
    initBalls(ballsCountPerSize,ellipseRatio, speed, colorArray, contrast, orbitDirection, coupleOrFollow);
}
if (init()) {
    initBalls([{size:2,count:1400},{size:3,count: 1000}],{min:0.8,max:1.5},{min:0.2,max:2},['#0b1858','#0e7d49','#741c1c'],200,false,true);
    animate();
}

