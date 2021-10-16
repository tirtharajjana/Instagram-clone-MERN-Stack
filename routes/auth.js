const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")

router.get('/', (req, res) => {
    res.send("hi")
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(422).json({ error: "please add all fields" })
    }
    User.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exist with that email" })
            }
            else {
                const user = new User({ email, name, password });
                user.save()
                    .then(user => {
                        console.log(user);
                        return res.status(200).json({ message: "saved successfully" })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })

})

module.exports = router;