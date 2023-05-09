const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.log(`${req.method} request received to get notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text, id } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id,
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    }
    else {
        res.error('Error in adding note');
    }
});

module.exports = notes;