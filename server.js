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
   fs.readFile("./db/db.json","utf8", function(err, data){
    res.json(JSON.parse(data))
   })
})

app.post("/api/notes", function(req, res){
    var title = req.body.title 
    var text = req.body.text 
    var newNote = {title, text, id:uuidv4()}
    fs.readFile("./db/db.json", function(err, data){
        var currentNotes = JSON.parse(data)
        currentNotes.push(newNote)
        fs.writeFile("./db/db.json", JSON.stringify(currentNotes), function(err) {
            console.log(data)
        })
        res.sendFile(path.join(__dirname, "/public/notes.html"))
    })
})

app.delete("/api/notes/:id", function(req, res) {
    fs.readFile('./db/db.json', function(err, data) {
        var clicked = req.params.id
        var json = JSON.parse(data)
        var filtered = json.filter(note => note.id !== clicked)
        fs.writeFile('./db/db.json', JSON.stringify(filtered), function(err) {
            console.log('note deleted')
        })
        res.sendFile(path.join(__dirname, "/public/notes.html"))
    })
})

app.listen(PORT, function() {
    console.log("app listening on port http://localhost:" + PORT)
})