const express = require("express")
const path = require("path")
const fs = require("fs")
const db = require("./db/db.json")
const {v4: uuidv4} = require("uuid")
const {response} = require("express")

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", function(req, res){
   fs.readFile("/db/db.json","utf8", function(err, data){
       console.log(res.json(JSON.parse(data)))
    //    
   })
})

app.listen(PORT, function() {
    console.log("app listening on port http://localhost:" + PORT)
})