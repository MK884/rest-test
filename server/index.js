const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (req, res) => {
  res.send("<h1>Wlecome</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  let id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (!note) return res.status(404).end();
  res.json(note);
});

app.get("/api/notes/:id", (req, res) => {
  let id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(200).end();
});

app.post("/api/notes", (req, res) => {
  let body = req.body;

  if(!body){
    return res.status(400).json({
        'error': 'content missing'
    })
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false
  };

  notes = notes.concat(note);

  res.json(note);

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
