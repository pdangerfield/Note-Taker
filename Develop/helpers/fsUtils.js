const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
/**
 * Helper function that saves new note to db.json
 * @param {object} newNote - note to be saved
 * @param {array} noteList - array of notes
 * @returns {object} newNote
 */

const writeToFile = (newNote) => {
    fs.writeFile('./db/db.json', JSON.stringify(newNote, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to db.json`)
    );
};
/**
 * Helper function that gets all notes from db.json
 * @param {object} newNote - note to be saved
 * @param {array} noteList - array of notes
 * @returns {object} newNote
 */

const readAndAppend = (newNote) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
            writeToFile(parsedNotes);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend };