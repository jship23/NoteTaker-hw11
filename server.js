//dependencies
const fs = require("fs");
const path = require("path");
const express = require("express");
const store = require("./db/store");
const { v4: uuid } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//GET HTML ROUTES
app.get("/notes",  (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

//GET API ROUTES
app.get("/api/notes", (req, res) =>{
    getNotes(function (err, data) {
        res.json(data);
    });
});

//POST
app.post("/api/notes", (req, res) =>{
    const note = { ...req.body, id: uuid() };
    postNotes(note, function (err, data) {
        res.json(data);
    });
});

//DELETE
app.delete("/api/notes/:id", function(req, res) {
    const deleteNote = req.params.id;
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        const filteredArray = savedNotes.filter(function (note) {
            return note.id !== deleteNote;
        });
        console.log(filteredArray);
        fs.writeFile("db/db.json", JSON.stringify(filteredArray), function () {
            console.log("Your note was deleted");
            return res.json(filteredArray);
        });
    });
});

function getNotes(cb) {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', function (err, data) {
        if (err) throw err;
        cb(null, JSON.parse(data));
    })
};

function postNotes(note, cb) {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', function (err, data) {
        if (err) throw err;
        const notes = JSON.parse(data)
        notes.push(note);
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notes), function (err, data) {
            if (err) throw err;
            cb(null, notes);
        })
    })
};

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
