const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const readAndAppend = require('./public/assets/helper/readAndAppend');
const writeToFile = require('./public/assets/helper/readAndAppend');
const notesData = require('./db/db.json');


const PORT = process.env.port || 3001;

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(notesData);
  console.info(`${req.method} request received to get notes`);
});


app.post('/api/notes', (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('note added');
  } else {
    res.error('error in saving note');
  }
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);