const fs = require("fs");
const util = require("util");
const router = require('express').Router();
const writeFileAsync = util.promisify(fs.writeFile);

var noteContents = require("../../db/noteContent");


    //display notes
    router.get("/notes", function(req, res) {
        res.json(noteContents);
    });

    //create new posts
    router.post("/notes", function(req, res) {
        
        let newNote = req.body;

        // check to find last id, assign the note to one greater than that id
        let lastId = noteContents[noteContents.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId;
        
        console.log("Req.body:", req.body);
        noteContents.push(newNote);

        writeFileAsync( "./db/db.json", JSON.stringify(noteContents))
        .then(function() {
            console.log("notes has been updated!");
        });

        res.json(newNote);
    });

    // delete notes
    router.delete("/notes/:id", function(req, res) {

        console.log("Req.params:", req.params);
        let chosenId = parseInt(req.params.id);
        console.log(chosenId);


        for (let i = 0; i < noteContents.length; i++) {
            if (chosenId === noteContents[i].id) {
                noteContents.splice(i,1);
                
                let noteJSON = JSON.stringify(noteContents, null, 1);
                //placeholders for JSON
                writeFileAsync("./db/db.json", noteJSON).then(function() {
                console.log ("Chosen note has been deleted!");
            });                 
            }
        }
        res.json(noteContents);
        
    });

    

module.exports = router;