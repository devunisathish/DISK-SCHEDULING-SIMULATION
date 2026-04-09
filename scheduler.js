function startScheduling(){

let rows = document.querySelectorAll("#fileTable tr");

let tracks = [];

rows.forEach(r => {

let track = parseInt(r.children[1].innerText);

tracks.push(track);

});

let head = 50;

let algo = document.getElementById("algorithm").value;

let order = [];

if(algo=="FCFS"){
order=[head,...tracks];
}

if(algo=="SSTF"){

order=[head];

let remaining=[...tracks];

while(remaining.length){

remaining.sort((a,b)=>Math.abs(a-head)-Math.abs(b-head));

let next=remaining.shift();

order.push(next);

head=next;

}

}

drawSchedule(order);

document.getElementById("scheduleExplanation").innerText =
"Head Movement Order: " + order.join(" → ");

}

function FCFS(requests, head){

let order=[head,...requests]

return order

}
function SSTF(requests, head){

let order=[head]

let remaining=[...requests]

while(remaining.length){

remaining.sort((a,b)=>Math.abs(a-head)-Math.abs(b-head))

let next=remaining.shift()

order.push(next)

head=next

}

return order

}

function SCAN(requests, head){

let left=[]
let right=[]

requests.forEach(r=>{

if(r<head) left.push(r)
else right.push(r)

})

left.sort((a,b)=>b-a)
right.sort((a,b)=>a-b)

return [head,...right,199,...left]

}

function CSCAN(requests, head){

let left=[]
let right=[]

requests.forEach(r=>{

if(r<head) left.push(r)
else right.push(r)

})

left.sort((a,b)=>a-b)
right.sort((a,b)=>a-b)

return [head,...right,199,0,...left]

}

function calculateSeek(order){

let total=0

let steps=[]

for(let i=0;i<order.length-1;i++){

let seek=Math.abs(order[i]-order[i+1])

steps.push(`| ${order[i]} - ${order[i+1]} | = ${seek}`)

total+=seek

}

return {steps,total}

}

function drawGraph(canvasId,order){

let canvas=document.getElementById(canvasId)

let ctx=canvas.getContext("2d")

ctx.clearRect(0,0,canvas.width,canvas.height)

let width=canvas.width

let height=canvas.height

let xStart=40

for(let i=0;i<=200;i+=20){

let x=xStart+(i/200)*(width-80)

ctx.beginPath()
ctx.moveTo(x,20)
ctx.lineTo(x,30)
ctx.stroke()

ctx.fillText(i,x-5,15)

}

let yGap=40

for(let i=0;i<order.length-1;i++){

let x1=xStart+(order[i]/200)*(width-80)
let x2=xStart+(order[i+1]/200)*(width-80)

let y1=40+i*yGap
let y2=40+(i+1)*yGap

ctx.beginPath()
ctx.moveTo(x1,y1)
ctx.lineTo(x2,y2)
ctx.stroke()

ctx.beginPath()
ctx.arc(x2,y2,4,0,Math.PI*2)
ctx.fill()

}

}
function runComparison(){

let rows=document.querySelectorAll("#fileTable tr")

let requests=[]

rows.forEach(r=>{

requests.push(parseInt(r.children[1].innerText))

})

let head=50

let fcfsOrder=FCFS(requests,head)
let sstfOrder=SSTF(requests,head)
let scanOrder=SCAN(requests,head)
let cscanOrder=CSCAN(requests,head)

let fcfs=calculateSeek(fcfsOrder)
let sstf=calculateSeek(sstfOrder)
let scan=calculateSeek(scanOrder)
let cscan=calculateSeek(cscanOrder)

drawGraph("fcfsCanvas",fcfsOrder)
drawGraph("sstfCanvas",sstfOrder)
drawGraph("scanCanvas",scanOrder)
drawGraph("cscanCanvas",cscanOrder)

document.getElementById("fcfsCalc").innerHTML=
fcfs.steps.join("<br>")+`<br><b>Total Seek = ${fcfs.total}</b>`

document.getElementById("sstfCalc").innerHTML=
sstf.steps.join("<br>")+`<br><b>Total Seek = ${sstf.total}</b>`

document.getElementById("scanCalc").innerHTML=
scan.steps.join("<br>")+`<br><b>Total Seek = ${scan.total}</b>`

document.getElementById("cscanCalc").innerHTML=
cscan.steps.join("<br>")+`<br><b>Total Seek = ${cscan.total}</b>`

let best=Math.min(fcfs.total,sstf.total,scan.total,cscan.total)

let algo=""

if(best==fcfs.total) algo="FCFS"
if(best==sstf.total) algo="SSTF"
if(best==scan.total) algo="SCAN"
if(best==cscan.total) algo="C-SCAN"

document.getElementById("bestAlgo").innerText=
"Best Algorithm (Minimum Seek Time): "+algo

}