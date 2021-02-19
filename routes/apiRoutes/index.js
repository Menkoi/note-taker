// Linking the noteContents in db to this routes.
var noteContents = [
    {
    "title":"Test Title 1",
    "text":"Test text",
    "id":1
    },
    {
    "title":"Test Title 2",
    "text":"Test text",
    "id":2
    }
    
];

//Create promise-based versions of functions using node style callbacks
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

// Create a route
module.exports = function(app) {

    //Display all notes
    app.get("/api/notes", function(req, res) {
        res.json(noteContents);
    });

    //Create new posts
    app.post("/api/notes", function(req, res) {
        
        let newNote = req.body;

        // check to find last id in our notes json file, and assign the note to one greater than that id
        let lastId = noteContents[noteContents.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId;
        
        console.log("Req.body:", req.body);
        noteContents.push(newNote);

        // write to the noteContents.json file as well
        writeFileAsync( JSON.stringify(noteContents)).then(function() {
            console.log("noteContents.json has been updated!");
        });

        res.json(newNote);
    });
        
};