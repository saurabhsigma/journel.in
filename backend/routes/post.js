const express = require("express");
const Post = require("../models/Post"); // Assuming Post is a Mongoose model
const jwt = require("jsonwebtoken");

const router = express.Router();

// Route to view all posts
router.get("/view", async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch posts from the database
    res.json(posts); // Return posts in JSON format
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Failed to retrieve posts" });
  }
});

// Route to create a new post
router.post("/write", async (req, res) => {
  const { title, content, comments } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const post = new Post({ title, content, comments });
    await post.save();
    res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Failed to create post" });
  }
});

module.exports = router;
