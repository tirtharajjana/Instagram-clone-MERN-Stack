const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post")

router.get('/allpost', (req, res) => {
    Post.find()
        .populate('postedBy', "_id name")
        .then(posts => {
            return res.json({ posts })
        }).catch(err => console.log(err))
})

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body;

    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    req.user.password = undefined;
    const post = new Post({ title, body, postedBy: req.user, photo: pic })
    post.save().then(result => {
        res.json({ post: result })
    }).catch(err => console.log(err))
})

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(myPost => {
            return res.json({ myPost })
        })
        .catch(err => console.log(err))
})

module.exports = router;