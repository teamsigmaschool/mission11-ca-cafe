const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sigma Café menu. Stored in memory, so it resets whenever the server restarts.
const menu = [
  { id: 1, name: "Flat White", price: 6.5, available: true },
  { id: 2, name: "Iced Americano", price: 5, available: true },
  { id: 3, name: "Banana Bread", price: 4.5, available: false },
];
let nextId = 4;

// GET /menu — return every item
app.get("/menu", (req, res) => {
  res.json(menu);
});

// GET /menu/:id — return one item
app.get("/menu/:id", (req, res) => {
  const item = menu.find((entry) => entry.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// TODO 1: POST /menu — add a new item (build this with Copilot)

// TODO 2: PUT /menu/:id — update an item (build this with Copilot)

// DELETE /menu/:id — remove an item
app.delete("/menu/:id", (req, res) => {
  const index = menu.findIndex((entry) => entry.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  menu.splice(index, 1);
  res.json({ message: "Item deleted" });
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Could not start the server. Is it already running?", error.message);
    return;
  }
  console.log(`Sigma Café API listening on port ${PORT}`);
});
