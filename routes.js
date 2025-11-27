import express from "express";

const router = express.Router();

let items = [
  { _id: 0, name: "Cap", weather: "hot", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png" },
  { _id: 1, name: "Jacket", weather: "cold", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png" },
  { _id: 2, name: "Sweater", weather: "warm", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sweater.png" },
  { _id: 3, name: "T-Shirt", weather: "hot", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png" },
  { _id: 4, name: "Hoodie", weather: "warm", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png" },
  { _id: 5, name: "Coat", weather: "cold", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png" },
  { _id: 6, name: "Shorts", weather: "hot", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Shorts.png" },
  { _id: 7, name: "Scarf", weather: "cold", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Scarf.png" },
  { _id: 8, name: "Jeans", weather: "warm", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jeans.png" },
  { _id: 9, name: "Sandals", weather: "hot", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sandals.png" },
  { _id: 10, name: "Sneakers", weather: "warm", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png" },
  { _id: 11, name: "Gloves", weather: "cold", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Gloves.png" },
  { _id: 12, name: "Boots", weather: "cold", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Boots.png" },
  { _id: 13, name: "Sunglasses", weather: "hot", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sunglasses.png" },
  { _id: 14, name: "Sweatshirt", weather: "warm", imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sweatshirt.png" },
];

const doesUserExist = (req, res, next) => {
  // Placeholder middleware
  console.log("✅ doesUserExist middleware called");
  next();
};

// GET all items
router.get("/items", doesUserExist, (req, res) => {
  res.json(items);
});

// POST new item
router.post("/items", doesUserExist, (req, res) => {
  const newItem = req.body;
  newItem._id = Date.now(); // unique ID
  items.push(newItem);
  console.log("✅ Added:", newItem);
  res.status(201).json(newItem);
});

// DELETE item
router.delete("/items/:id", doesUserExist, (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const index = items.findIndex((item) => item._id === itemId);

  if (index === -1) {
    console.log("❌ Item not found:", itemId);
    return res.status(404).json({ message: "Item not found" });
  }

  const deletedItem = items.splice(index, 1)[0];
  console.log("🗑️ Deleted:", deletedItem);
  res.json(deletedItem);
});

export default router;