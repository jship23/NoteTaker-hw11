//dependencies

const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//GET
app.get("/notes",  (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "index.html"))
});


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
