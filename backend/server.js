const express = require("express");
// requiring all the necessary libs and initialisation
const app = express();
// for using json data in our website
app.use(express.json())

const posts = [{
    date: "2015-12-12",
    title: "My first day at college",
    description: "Today was my first day at my college."
}, {
    date: "2015-12-16", // Corrected date
    title: "My first day at school",
    description: "Today was my first day at school."
}];

app.get("/", (req, res) => {
    res.send("Hello, welcome to the journal.in");
    console.log("The user has entered the main website homepage!");
});

app.get("/user-posts", (req, res) => {
    console.log("This is where the user posts will be displayed!");
    res.json(posts);
});

app.post("/user-post", (req, res) => {
    try {
        const data = req.body; // Directly access req.body
        posts.push(data);
        console.log("Succeeded");
        res.status(201).send("Post added successfully!"); // Send a success response
    } catch (e) {
        console.log("Error: ", e);
        res.status(500).send("An error occurred while adding the post."); // Send an error response
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3000");
});
