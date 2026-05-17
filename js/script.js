import * as THREE from "three";
import { plane, ThreeMFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';


/****  Setiing up  the scene ****/

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0,0,5);

orbit.enableZoom = false;
orbit.enablePan = false;


// Adding Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambient);

const ambient1 = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambient1);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);




/*** Debug aids ***/  
let debug = false;
  if(debug ) {
    scene.add(new THREE.AxesHelper(5));
  }


/* Setting up the cube geometry and materials */
const material = [
    	    new THREE.MeshPhysicalMaterial( {color: 'lightgray'}),
    	    new THREE.MeshPhysicalMaterial( {color: 'lightgray'}),
    	    new THREE.MeshPhysicalMaterial( {color: 'lightgray'}),
    	    new THREE.MeshPhysicalMaterial( {color: 'lightgray'}),
    	    new THREE.MeshPhysicalMaterial( {color: 'lightgray'}),
    	    new THREE.MeshPhysicalMaterial( {color: 'lightgray'}),
      ]

var object = new THREE.Mesh(
			new RoundedBoxGeometry(0.99,0.99,0.99), material
    );	

scene.background = new THREE.Color(0x222222);


const reflectivity = 1;
const transmission = 0.3;
const roughness = 0.5;
const metalness = 0.2;
const clearcoat = 0.3;
const clearcoatRoughness = 0.25;
const ior = 1.2;
const thickness = 0.5;
const iridescence = 0;

//Right Side Index 0
object.position.x = 5;
object.material[0].color = new THREE.Color(0x333030);
object.material[0].reflectivity = reflectivity;
object.material[0].transmission = transmission;
object.material[0].roughness = roughness;
object.material[0].metalness = metalness;
object.material[0].clearcoat = clearcoat;
object.material[0].clearcoatRoughness = clearcoatRoughness
object.material[0].ior = ior
object.material[0].thickness = thickness
object.material[0].iridescence = iridescence


//Left Side
object.material[1].color = new THREE.Color(0x333030)
object.material[1].reflectivity = reflectivity
object.material[1].transmission = transmission
object.material[1].roughness = roughness
object.material[1].metalness = metalness
object.material[1].clearcoat = clearcoat
object.material[1].clearcoatRoughness = clearcoatRoughness
object.material[1].ior = ior
object.material[1].thickness = thickness
object.material[1].iridescence = iridescence

//Top
object.material[2].color = new THREE.Color(0x333030)
object.material[2].reflectivity = reflectivity
object.material[2].transmission = transmission
object.material[2].roughness = roughness
object.material[2].metalness = metalness
object.material[2].clearcoat = clearcoat
object.material[2].clearcoatRoughness = clearcoatRoughness
object.material[2].ior = ior
object.material[2].thickness = thickness
object.material[2].iridescence = iridescence

//Bottom
object.material[3].color = new THREE.Color(0x333030)
object.material[3].reflectivity = reflectivity
object.material[3].transmission = transmission
object.material[3].roughness = roughness
object.material[3].metalness = metalness
object.material[3].clearcoat = clearcoat
object.material[3].clearcoatRoughness = clearcoatRoughness
object.material[3].ior = ior
object.material[3].thickness = thickness
object.material[3].iridescence = iridescence

// Front
object.material[4].color = new THREE.Color(0x333030)
object.material[4].reflectivity = reflectivity
object.material[4].transmission = transmission
object.material[4].roughness = roughness
object.material[4].metalness = metalness
object.material[4].clearcoat = clearcoat
object.material[4].clearcoatRoughness = clearcoatRoughness
object.material[4].ior = ior
object.material[4].thickness = thickness
object.material[4].iridescence = iridescence

//Back
object.material[5].color = new THREE.Color(0x333030)
object.material[5].reflectivity = reflectivity
object.material[5].transmission = transmission
object.material[5].roughness = roughness
object.material[5].metalness = metalness
object.material[5].clearcoat = clearcoat
object.material[5].clearcoatRoughness = clearcoatRoughness
object.material[5].ior = ior
object.material[5].thickness = thickness
object.material[5].iridescence = iridescence

const boxGeometry = new RoundedBoxGeometry(0.99,0.99,0.99);
 

// This variable holds all the 27 cubelets
var cubelets = [];

// Creating the cubelets
    for (var y = -1; y < 2; y++) {
        for (var z = -1; z <2; z++){
            for (var x = -1; x < 2; x++){


                const uniqueMaterial = material.map(m => m.clone());
                const cubelet = new THREE.Mesh(boxGeometry, uniqueMaterial);
                cubelet.position.set(x, y, z);
                scene.add(cubelet);
                cubelets.push(cubelet);

                // Back
                if (z < -0.5) {
                    cubelet.material[5].color = new THREE.Color("yellow");
                }
                
                //Left
                if (x < -0.5){
                    cubelet.material[1].color = new THREE.Color("blue");
                }

                //Top
                if (y > 0.5){
                    cubelet.material[2].color = new THREE.Color("red");
                }

                //Right
                if (x > 0.5){
                    cubelet.material[0].color = new THREE.Color(0x16f251);
                }

                //Bottom
                if (y < -0.5){
                    cubelet.material[3].color = new THREE.Color("orange");
                }

                if (z > 0.5){
                    cubelet.material[4].color = new THREE.Color("white");
                }
            }
        }  
    }


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var previous_position = new THREE.Vector2();
var delta_position = new THREE.Vector2();
var initial_position = new THREE.Vector2();
var clicked = false;
const canvas = document.querySelector('canvas');
var activeAxes2D = []; // Store the final 2D directions here
var hitPointWorld = new THREE.Vector3(); // Store where we clicked
var potential_axis = [];
var axis_lock = null;
var worldNormal;
var intersected_cubelet;
var cubelet_group;
var rotation_axis;
var mousemove_activation = 0;
var rotation_remainder;
var rotation_quotient;
var snap_activation = false;
const pixel_number = 285.4063566522241;
var do_it = false;
var normal;
var normal_sign;

const x_axis = new THREE.Vector3(1, 0, 0);
    x_axis.name = 'x'
const y_axis = new THREE.Vector3(0, 1, 0);
    y_axis.name = 'y'
const z_axis = new THREE.Vector3(0, 0 ,1);
    z_axis.name = 'z'
const origin = new THREE.Vector3(0,0,0);
const axes = [x_axis, y_axis, z_axis];
var direction;
const rotation_value = (Math.PI / 2) / pixel_number
    



// Avoiding axes helper by raycaster
const targets = scene.children.filter(obj => !(obj instanceof THREE.AxesHelper));

function onMouseDown(event){
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = (event.clientY - rect.top) / rect.height * -2 + 1;

    previous_position.x = event.clientX;
    previous_position.y = event.clientY;

    initial_position.x = event.clientX;
    initial_position.y = event.clientY;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(targets, true);

    

    if (intersects.length > 0){

        intersected_cubelet = intersects[0].object
        clicked = true;
        orbit.enabled = false;

        const localNormal = intersects[0].face.normal;
         worldNormal = localNormal.clone();
        worldNormal.applyMatrix3(new THREE.Matrix3().getNormalMatrix(intersects[0].object.matrixWorld));
        console.log("Face Normal:", worldNormal);

        hitPointWorld.copy(intersects[0].point);

        if (  Math.round(Math.abs(worldNormal.x)) == 1) {
            potential_axis = [axes[1], axes[2]];
            normal = 'x'
            normal_sign = Math.sign(worldNormal.x)}

        else if ( Math.round(Math.abs(worldNormal.y)) == 1) {
            potential_axis = [axes[0], axes[2]];
            normal = 'y'
            normal_sign = Math.sign(worldNormal.y)}

        else if ( Math.round(Math.abs(worldNormal.z)) == 1) {
            potential_axis = [axes[0], axes[1]];
            normal = 'z'
            normal_sign = Math.sign(worldNormal.z)}

        if (cubelets.includes(intersects[0].object)){
            console.log("This is a cubelet");
            console.log(intersected_cubelet.position)
        }
       
    }



}

 


function onMouseMove(event){

   if (!clicked) return;

    // 1. Calculate Mouse Delta
    delta_position.set(
        event.clientX - previous_position.x,
        event.clientY - previous_position.y
    );

    var normal_delta = delta_position.normalize();

    

    let projectedDirections;


    if (mousemove_activation <= 5){
        delta_position.set(
        event.clientX - initial_position.x,
        event.clientY - initial_position.y
    );

    var normal_delta = delta_position.normalize();
    mousemove_activation +=1
    }

    else {

        do_it = true

    if (axis_lock === null){
    projectedDirections = potential_axis.map(axis3D => {

        // Projecting the axis
        const axis = axis3D.clone().project(camera);
        
        // projecting the camera
        const ori = origin.clone(). project(camera);
        
        // converting axis and origin to pixel coordinates
        const axis2D = new THREE.Vector2(
            (axis.x + 1) * canvas.width / 2,
            (1 - axis.y) * canvas.height / 2
        );

        const ori2D = new THREE.Vector2(
            (ori.x + 1) * canvas.width / 2,
            (1 - ori.y) * canvas.height / 2
        );

        // converting the vector to start from the 2D pixel coordinate origin
        const v2D = new THREE.Vector2(axis2D.x - ori2D.x, axis2D.y - ori2D.y);
        
        return v2D.normalize(); // We only care about direction
    });

    // 3. Dot Product Comparison
    const score0 = normal_delta.dot(projectedDirections[0]);
    const score1 = normal_delta.dot(projectedDirections[1]);

    if (Math.abs(score0) > Math.abs(score1)) {
        rotation_axis = potential_axis[1].name
        direction = projectedDirections[0]
        console.log(`Rotating Axis ${rotation_axis}`);
        axis_lock = 0;
    } else {
        rotation_axis = potential_axis[0].name
        direction = projectedDirections[1]
        console.log(`Rotating Axis ${rotation_axis}`);
        axis_lock = 1;
       
            }

        
        cubelet_group = new THREE.Group();

        for (var cubelet of cubelets){
            if (Math.round(cubelet.position[rotation_axis]) == Math.round(intersected_cubelet.position[rotation_axis]) ){
                cubelet_group.add(cubelet);
                console.log()
        }
        scene.add(cubelet_group)

    }
    }

    if (axis_lock != null && (axis_lock == 1 || axis_lock == 0)){

        var distance_travelled = Math.sqrt((event.clientX - previous_position.x) ** 2 + 
                                            (event.clientY - previous_position.y) **2)
        var dot_product = normal_delta.dot(direction);

        // defining the rotation direction on each face

        if(normal == 'z' && normal_sign == 1 ){
            if (rotation_axis == "x"){
            cubelet_group.rotation[rotation_axis] -=  dot_product * rotation_value * distance_travelled}

            if (rotation_axis == "y"){
            cubelet_group.rotation[rotation_axis] +=  dot_product * rotation_value * distance_travelled}
        }


         else if(normal == 'z' && normal_sign == -1 ){
            
            if (rotation_axis == "x"){
            cubelet_group.rotation[rotation_axis] +=  dot_product * rotation_value * distance_travelled}

            if (rotation_axis == "y"){
            cubelet_group.rotation[rotation_axis] -=  dot_product * rotation_value * distance_travelled}
        }

        else if(normal == 'y' && normal_sign == 1 ){
            console.log(normal, normal_sign)
            if (rotation_axis == "x"){
            cubelet_group.rotation[rotation_axis] +=  dot_product * rotation_value * distance_travelled}

            if (rotation_axis == "z"){
            cubelet_group.rotation[rotation_axis] -=  dot_product * rotation_value * distance_travelled}
        }

        else if(normal == 'y' && normal_sign == -1 ){
            console.log(normal, normal_sign)
            if (rotation_axis == "x"){
            cubelet_group.rotation[rotation_axis] -=  dot_product * rotation_value * distance_travelled}

            if (rotation_axis == "z"){
            cubelet_group.rotation[rotation_axis] +=  dot_product * rotation_value * distance_travelled}
        }

        else if(normal == 'x' && normal_sign == 1 ){
            console.log(normal, normal_sign)
            if (rotation_axis == "y"){
            cubelet_group.rotation[rotation_axis] -=  dot_product * rotation_value * distance_travelled}

            if (rotation_axis == "z"){
            cubelet_group.rotation[rotation_axis] +=  dot_product * rotation_value * distance_travelled}
        }

        else if(normal == 'x' && normal_sign == -1 ){
            console.log(normal, normal_sign)
            if (rotation_axis == "y"){
            cubelet_group.rotation[rotation_axis] +=  dot_product * rotation_value * distance_travelled}

            if (rotation_axis == "z"){
            cubelet_group.rotation[rotation_axis] -=  dot_product * rotation_value * distance_travelled}
        }

        
        else {     
        cubelet_group.rotation[rotation_axis] +=  dot_product * rotation_value * distance_travelled}
        }}

     previous_position.x = event.clientX;  // changing the prev_position for the next iteration
        previous_position.y = event.clientY;

}



function onMouseUp(event){

    if (do_it){
        snap_activation = true;
    }
    axis_lock = null;
    orbit.enabled = true;
    clicked = false;
    mousemove_activation = 0;
    

    

    }

   

function snap(){
    if (!snap_activation) return;

    rotation_remainder = cubelet_group.rotation[rotation_axis] % (Math.PI/ 2)
    rotation_quotient = Math.trunc(cubelet_group.rotation[rotation_axis] / (Math.PI / 2))
    var nearest_rotation;

    console.log("rotation quotient", rotation_quotient)
    console.log("rotation remainder", rotation_remainder)
    
    if (rotation_quotient >= 0){
        if (rotation_remainder >= Math.PI/4){
            cubelet_group.rotation[rotation_axis] += 0.1
            nearest_rotation = rotation_quotient + 1
        }

        else{
            cubelet_group.rotation[rotation_axis] -= 0.1
            nearest_rotation = rotation_quotient 
        }
    }

    else {
        if ( rotation_remainder <= -(Math.PI/4)) {
            cubelet_group.rotation[rotation_axis] -= 0.01
            nearest_rotation = rotation_quotient - 1
        }

        else {
            
            cubelet_group.rotation[rotation_axis] += 0.01
            nearest_rotation = rotation_quotient
        }
    }
        
       
    

    if (Math.abs( (Math.PI/2)* nearest_rotation - cubelet_group.rotation[rotation_axis]) < 0.3){
       
        cubelet_group.rotation[rotation_axis] = ( Math.PI/2 * nearest_rotation);
        snap_activation = false;
        do_it = false;

        if (cubelet_group) {
        
        // We need to bake the rotation into the world matrices
        cubelet_group.updateMatrixWorld(true);

        // We use a while loop because scene.attach REMOVES the child from the group.
        // If we used a standard for loop, the index would get messed up!
        while (cubelet_group.children.length > 0) {
            const child = cubelet_group.children[0];
            scene.attach(child);
        }

        // 3. Remove the now-empty group from the scene
        scene.remove(cubelet_group);
        cubelet_group = null; // Clear the reference
        
    }
    }


}


document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove)
document.addEventListener('mouseup', onMouseUp)


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});






function animate(time){ 
    
    snap()
    
    renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);

