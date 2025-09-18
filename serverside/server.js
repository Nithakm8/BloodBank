const fs=require('fs')
const http=require('http')
const url=require('url')
const app=http.createServer((req,res)=>{
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
})
app.listen(4000)