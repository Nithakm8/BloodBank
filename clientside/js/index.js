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
          <td> <input type="text" id="bloodtype-${donar._id}" value="${donar.bloodtype}" disabled></td>
          <td> <input type="text" id="age-${donar._id}"  value="${donar.age}" disabled></td>
          <td> <input type="text"  id="weight-${donar._id}" value="${donar.weight}" disabled></td>
          <td> <input type="text" id="phnumber-${donar._id}" value="${donar.phnumber}" disabled></td>
          <td> <input type="text"  id="date-${donar._id}" value="${donar.date}" disabled></td>
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

async function handleEdit(id){

  const inputs=document.querySelectorAll('input')
  inputs.forEach(input=>input.removeAttribute('disabled'))


  
  const name=document.getElementById(`name-${id}`).value
  const bloodtype=document.getElementById(`bloodtype-${id}`).value
  const age=document.getElementById(`age-${id}`).value
  const weight=document.getElementById(`weight-${id}`).value
  const phnumber=document.getElementById(`phnumber-${id}`).value
  const date=document.getElementById(`date-${id}`).value  
  let data={id,name,bloodtype,age,weight,phnumber,date}
console.log(data);

  const jsonData=JSON.stringify(data)
const res=await fetch('http://localhost:4000/updatedonar',{
  method:"PUT",
  "Content-Type":"text/json",
  "body":jsonData
})
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
          <td> <input type="text"  value="${donar.bloodtype}" disabled></td>
          <td> <input type="text" value="${donar.age}" disabled></td>
          <td> <input type="text" value="${donar.weight}" disabled></td>
          <td> <input type="text"  value="${donar.phnumber}" disabled></td>
          <td> <input type="text" value="${donar.date}" disabled></td>
          <td>
            <button class="editbtn" id="editbtn" onclick="handleEdit('${donar._id}')">EDIT</button>
             
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