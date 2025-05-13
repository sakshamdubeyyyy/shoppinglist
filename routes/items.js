const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Get all items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Add an item
router.post("/", async (req, res) => {
  const { name, quantity } = req.body;
  const newItem = new Item({ name, quantity });
  await newItem.save();
  res.status(201).json(newItem);
});

// Update an item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedItem);
});

// Delete an item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.json({ message: "Item deleted" });
});

module.exports = router;
