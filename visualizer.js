let canvas = document.getElementById("scheduleCanvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let order = [];
let stepIndex = 0;
let headStart = 50;

/* DRAW SCALE AXIS */

function drawAxis(head){

ctx.clearRect(0,0,width,height);

ctx.beginPath();
ctx.moveTo(50,40);
ctx.lineTo(width-20,40);
ctx.strokeStyle="black";
ctx.lineWidth=2;
ctx.stroke();

/* TRACK MARKERS */

for(let i=0;i<=200;i+=20){

let x = 50 + (i/200)*(width-80);

ctx.beginPath();
ctx.moveTo(x,35);
ctx.lineTo(x,45);
ctx.stroke();

ctx.fillText(i,x-5,25);

}

/* HEAD POINTER */

let headX = 50 + (head/200)*(width-80);

ctx.beginPath();
ctx.arc(headX,40,7,0,Math.PI*2);
ctx.fillStyle="red";
ctx.fill();

ctx.fillStyle="black";
ctx.fillText("Head ("+head+")",headX-25,60);

}

/* START SCHEDULING */

function startScheduling(){

let rows = document.querySelectorAll("#fileTable tr");

let tracks = [];

rows.forEach(r=>{
tracks.push(parseInt(r.children[1].innerText));
});

let algo = document.getElementById("algorithm").value;

if(algo=="FCFS"){
order=[headStart,...tracks];
}

stepIndex = 0;

drawAxis(headStart);

document.getElementById("seekCalc").innerHTML="";

}

/* DRAW ONE STEP */

function drawStep(){

if(stepIndex>=order.length-1) return;

let x1 = 50 + (order[stepIndex]/200)*(width-80);
let x2 = 50 + (order[stepIndex+1]/200)*(width-80);

let y1 = 80 + stepIndex*60;
let y2 = 80 + (stepIndex+1)*60;

/* DRAW NODE */

ctx.beginPath();
ctx.arc(x1,y1,6,0,Math.PI*2);
ctx.fillStyle="blue";
ctx.fill();

/* DRAW LINE */

ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
ctx.strokeStyle="black";
ctx.lineWidth=2;
ctx.stroke();

/* NEXT NODE */

ctx.beginPath();
ctx.arc(x2,y2,6,0,Math.PI*2);
ctx.fill();

showSeekCalculation();

}

/* NEXT BUTTON */

function nextStep(){

if(stepIndex<order.length-1){

drawStep();

stepIndex++;

}

}

/* PREVIOUS BUTTON */

function previousStep(){

if(stepIndex>0){

stepIndex--;

drawAxis(headStart);

for(let i=0;i<stepIndex;i++){

let x1 = 50 + (order[i]/200)*(width-80);
let x2 = 50 + (order[i+1]/200)*(width-80);

let y1 = 80 + i*60;
let y2 = 80 + (i+1)*60;

ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
ctx.stroke();

ctx.beginPath();
ctx.arc(x2,y2,6,0,Math.PI*2);
ctx.fill();

}

}

}

/* SEEK CALCULATION */

function showSeekCalculation(){

let from = order[stepIndex];
let to = order[stepIndex+1];

let seek = Math.abs(from-to);

let area=document.getElementById("seekCalc");

area.innerHTML +=
`<div class="calc-line">| ${from} - ${to} | = ${seek}</div>`;

}