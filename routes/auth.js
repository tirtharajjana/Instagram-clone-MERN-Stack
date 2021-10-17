const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/', requireLogin, (req, res) => {
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
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({ email, name, password: hashedPassword });
                    user.save()
                        .then(user => {
                            console.log(user);
                            return res.status(200).json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
        })
        .catch(err => {
            console.log(err);
        })

})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" })
    }
    User.findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // console.log(savedUser);
                        // return res.json({ message: "Successfully Signed in" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        return res.json({ token })

                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or password" })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
})

module.exports = router;