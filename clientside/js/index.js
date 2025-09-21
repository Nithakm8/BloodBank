let donars=[]
async function getDonar(){
    const res=await fetch('http://localhost:4000/getDonar')
    const data=await res.json()
    donars=data
    let str=''
   donars.forEach((donar)=>{
        str+=`
        <div class="donar">
      <h3>Name:${donar.name}</h3>
      <h3>BloodType:${donar.bloodtype}</h3>
      <h3>Age:${donar.age}</h3>
      <h3>Weight:${donar.weight}</h3>
      <h3>Phone Number:${donar.phnumber}</h3>
      <h3>Last Donated Date:${donar.date}</h3>
    </div>
    <div class="btn">
    <button  class='editbtn' onclick='handleEdit("${donar.name}")'>EDIT</button>
    <button  class='deletebtn' onclick='handleDelete("${donar.name}")'>DELETE</button>
    </div>
    `
    })
    document.getElementById('donars').innerHTML=str  
    
}
getDonar()