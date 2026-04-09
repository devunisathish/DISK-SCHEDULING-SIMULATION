let step = 0;

let steps = [

{
title:"Disk Structure",
text:"A Hard Disk consists of circular platters that rotate at high speed to store data."
},

{
title:"Tracks",
text:"Tracks are circular rings on the platter where data is stored."
},

{
title:"Sectors",
text:"Each track is divided into sectors. A sector is the smallest storage unit."
},

{
title:"Read Write Head",
text:"The read/write head reads and writes data from the disk surface."
},

{
title:"Disk Arm",
text:"The disk arm moves the read/write head across different tracks."
},

{
title:"Disk Scheduling",
text:"When multiple files request disk access, disk scheduling algorithms decide the order of servicing."
}

];

function nextStep(){

if(step < steps.length-1){
step++;
}

updateStep();

}

function previousStep(){

if(step > 0){
step--;
}

updateStep();

}

function updateStep(){

document.getElementById("topicTitle").innerText = steps[step].title;

document.getElementById("structureExplanation").innerText = steps[step].text;

}