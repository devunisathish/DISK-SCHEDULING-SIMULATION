let files=[]

function addFile(){

let name=document.getElementById("filename").value

let location=parseInt(document.getElementById("location").value)

files.push({name,location})

updateTable()

}

function updateTable(){

let table=document.getElementById("fileTable")

table.innerHTML=""

files.forEach(f=>{

table.innerHTML+=`
<tr>
<td>${f.name}</td>
<td>${f.location}</td>
</tr>
`

})

}