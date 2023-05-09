const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3003;
const fs = require('fs');
const api = require('./routes/index.js')
const uuid = require('./helpers/uuid.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));



// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

app.get('/api/notes', (req, res) => {
  res.status(200).json(`${req.method} request received to get notes`);
});



app.post('/api/notes', (req, res) => {
  res.status(201).json(`${req.method} request received to add a note`);

  const { title, text, id } = req.body;

  if (title && text && id) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
  
    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);
  
        // Add a new review
        parsedNotes.push(newNote);
  
        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      }
    });
  
    const response = {
      status: 'success',
      body: newNote,
    };
  
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
}
});
app.delete('/api/notes/:id', function (req, res) {
  const id = req.params.id;
  console.log(id);
  
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }
  const notes = JSON.parse(data);

  const filteredNotes = notes.filter(note => note.id !== id);
  fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
  if (err) {
    console.error(err);
  }
});
  // res.status(200).json(`${req.method} request received to delete a note`);
  res.json(filteredNotes);
});
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);