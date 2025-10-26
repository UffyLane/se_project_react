import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: "Jacket", weather: "cold" },
  { id: 2, name: "T-Shirt", weather: "hot" },
];

// GET all items
app.get("/items", (req, res) => res.json(items));

// POST new item
app.post("/items", (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE item
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((item) => item.id !== id);
  res.status(200).json({ message: `Item ${id} deleted` });
});
