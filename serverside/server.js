const fs=require('fs')
const http=require('http')
const url=require('url')
const {MongoClient, ObjectId}=require('mongodb')
const queryString=require('querystring')
const client=new MongoClient('mongodb://127.0.0.1:27017/')
const app=http.createServer(async(req,res)=>{
    const db=client.db('BloodBank')
    const collection=db.collection('donar')
    const {pathname}=url.parse(req.url)
    if(pathname=='/'){
        res.writeHead(200,{"content-Type":"text/html"})
        res.end(fs.readFileSync('../clientside/index.html'))
    }
    else if(pathname=='/js/index.js'){
         res.writeHead(200,{"content-Type":"text/html"})
        res.end(fs.readFileSync('../clientside/js/index.js'))
    }
    else if(pathname=='/pages/add.html'){
         res.writeHead(200,{"content-Type":"text/html"})
        res.end(fs.readFileSync('../clientside/pages/add.html'))
    }
    if(pathname=='/submit' && req.method=='POST'){
        let body=''
        req.on('data',(chunks)=>{
            body+=chunks.toString()
            console.log(body);
            
        })
        req.on('end',()=>{
            const formData=queryString.parse(body)
            collection.insertOne(formData).then(()=>{
                console.log('Data added');
                
            }).catch((err)=>{
                console.log(err);
                
            })
        })
        res.writeHead(200,{'content-type':"text/html"})
        res.end(fs.readFileSync('../clientside/index.html'))
    }
    if(pathname=='/getDonar' && req.method=='GET'){
        const data=await collection.find().toArray()
        console.log(data);
        const jsonData=JSON.stringify(data)
        console.log(jsonData);
        
        res.writeHead(200,{'content-type':"text/json"})  
        res.end(jsonData)      
    }
    if(pathname=='/updatedonar' && req.method=="PUT"){
        console.log('update');
        
        let body=""
        req.on('data',(chunks)=>{
            body+=chunks.toString()
            console.log(body);
            
        })
        req.on('end',()=>{
            let data=JSON.parse(body)
            console.log(data);
            
        })
          req.on('end',()=>{
            let data=JSON.parse(body)
            const _id=new ObjectId(data.id)
            let updatedonar={
                name:data.name,
                bloodtype:data.bloodtype,
                age:data.age,
                weight:data.weight,
                phnumber:data.phnumber,
                date:data.date
            }
            collection.updateOne({_id},{$set:updatedonar}).then(()=>{
                res.writeHead(200,{"content-type":"text/plain"})
                res.end("success")
            }).catch((err)=>{
                console.log(err);
                res.writeHead(200,{"content-type":"text/plain"})
                res.end('Failed')
                
            })
        })


    }
    if(pathname=='/delete' && req.method=='DELETE'){
        let body=""
        req.on('data',(chunks)=>{
            body+=chunks.toString()
            console.log(body);
            
        })
      

        req.on('end',()=>{
            let _id=new ObjectId(body)
            collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"content-type":"text/plain"})
                res.end('success')
            }).catch((err)=>{
                console.log(err);
                res.writeHead(200,{"content-type":"text/plain"})
                res.end('Failed')
            })
        })
    }
       

        
})
app.listen(4000)