let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(75, 800/500, 0.1, 1000)

let renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(800,500)

document.getElementById("disk3d").appendChild(renderer.domElement)

camera.position.set(0,5,12)

/* LIGHT */

const light = new THREE.PointLight(0xffffff,1)
light.position.set(10,10,10)
scene.add(light)

/* CREATE MULTIPLE PLATTERS */

let platters=[]

for(let i=0;i<3;i++){

let geometry = new THREE.CylinderGeometry(4,4,0.3,64)

let material = new THREE.MeshPhongMaterial({
color:0x4a90e2,
wireframe:false
})

let platter = new THREE.Mesh(geometry,material)

platter.position.y=i*0.6

scene.add(platter)

platters.push(platter)

}

/* TRACK RINGS */

for(let r=1;r<=3;r++){

let ring = new THREE.RingGeometry(r, r+0.05, 64)

let mat = new THREE.MeshBasicMaterial({
color:0x00ff00,
side:THREE.DoubleSide
})

let track = new THREE.Mesh(ring,mat)

track.rotation.x = Math.PI/2

track.position.y = 1

scene.add(track)

}

/* DISK ARM */

let armGeo = new THREE.BoxGeometry(0.2,4,0.2)

let armMat = new THREE.MeshBasicMaterial({color:0xff0000})

let arm = new THREE.Mesh(armGeo,armMat)

arm.position.set(3,1,0)

scene.add(arm)

/* READ WRITE HEAD */

let headGeo = new THREE.SphereGeometry(0.2)

let headMat = new THREE.MeshBasicMaterial({color:0xffff00})

let head = new THREE.Mesh(headGeo,headMat)

head.position.set(3,-1,0)

scene.add(head)

/* ROTATION ANIMATION */

function animate(){

requestAnimationFrame(animate)

platters.forEach(p=>{
p.rotation.y += 0.01
})

renderer.render(scene,camera)

}

animate()