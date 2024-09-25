const express = require("express")
const Post = require("../models/Post")
const jwt = require("jsonwebtoken");


const router = express.Router();

router.get("/posts", async(req,res)=>{
    try {
        res.json(Post);
    }catch(error){
        console.log("Error" , error)
    }
    
});

router.post("/post", async(req,res)=>{

    const {title, content, comments} = req.body;

    try{
        const post = new User( {title, content, comments});
        await post.save();
        res.send("post updated!")
    }catch(error){
        console.log("error", error);
    }
})

module.exports = router;