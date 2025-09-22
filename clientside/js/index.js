let donars=[]
async function getDonar(){
    const res=await fetch('http://localhost:4000/getDonar')
    const data=await res.json()
    donars=data
    let str=''
   donars.forEach((donar)=>{
        str+=`
       
      <tr>
          <td> <input type="text" id="name-${donar._id}" value="${donar.name}" disabled></td>
          <td> <input type="text" value="${donar.bloodtype}" disabled></td>
          <td> <input type="text" value="${donar.age}" disabled></td>
          <td> <input type="text" value="${donar.weight}" disabled></td>
          <td> <input type="text" value="${donar.phnumber}" disabled></td>
          <td> <input type="text" value="${donar.date}" disabled></td>
          <td>
            <button class="editbtn" onclick="handleEdit('${donar._id}')">EDIT</button>
            <button class="deletebtn" onclick="handleDelete('${donar._id}')">DELETE</button>
          </td>
        </tr>
    `
    })
    document.getElementById('donars').innerHTML=str  
    
}
getDonar()

function handleEdit(id){
  
  
}

async function handleDelete(id){
  const res=await fetch('http://localhost:4000/delete',{
    "method":"DELETE",
    "headers":{"Content-Type":"text/plain"},
    "body":id

  })
  const message=await res.text()
  if(message=='success'){
    alert('Student deleted')
  }
  else{
    alert('Deletion failed')
  }
}
document.getElementById('search').addEventListener('keyup',(e)=>{
  console.log(e.target.value);
  
  let arr=donars.filter((donar)=>donar.name.toLowerCase().includes(e.target.value.toLowerCase()))
let str=''
if(arr.length>0){
  arr.forEach((donar)=>{
        str+=`
       
      <tr>
          <td> <input type="text" id="name-${donar._id}" value="${donar.name}" disabled></td>
          <td> <input type="text" value="${donar.bloodtype}" disabled></td>
          <td> <input type="text" value="${donar.age}" disabled></td>
          <td> <input type="text" value="${donar.weight}" disabled></td>
          <td> <input type="text" value="${donar.phnumber}" disabled></td>
          <td> <input type="text" value="${donar.date}" disabled></td>
          <td>
            <button class="editbtn" onclick="handleEdit('${donar._id}')">EDIT</button>
            <button class="deletebtn" onclick="handleDelete('${donar._id}')">DELETE</button>
          </td>
        </tr>
    `
}) 
  document.getElementById('donars').innerHTML=str
}
else{
  document.getElementById('donars').innerHTML='<h1>No donars found'
}
})