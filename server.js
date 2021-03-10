//dependencies
const fs = require("fs");
const path = require("path");
const express = require("express");
const store = require("./db/store");

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
    store
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

//POST
app.post("/api/notes", (req, res) =>{
    store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//DELETE
app.delete("/api/notes/:id", function(req, res) {
    store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));

});


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
