const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys')
const requireLogin = require('../middleware/requireLogin');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')

//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


const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))

router.get('/', requireLogin, (req, res) => {
    res.send("hi")
})

router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body;

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
                    const user = new User({ email, name, password: hashedPassword, pic });
                    user.save()
                        .then(user => {
                            // console.log(user);
                            transporter.sendMail({
                                to: user.email,

                                from: "tirtharajjana.cse19@chitkarauniversity.edu.in",
                                subject: "signup success",
                                html: "<h1>welcome to instagram</h1>"
                            })

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
                        const { _id, name, email, followers, following, pic } = savedUser;
                        return res.json({ token, user: { _id, name, email, followers, following, pic } })

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


router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User don't exist with this email" })
                }
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000;
                user.save().then(result => {
                    transporter.sendMail({
                        to: user.email,
                        from: "tirtharajjana.cse19@chitkarauniversity.edu.in",
                        subject: "Password reset",
                        html: `
                        <p>You requested for reset password</p>
                        <h5>Click this <a href="http://localhost:3000/reset/${token}" >link</a> to reset password</h5>
                        `
                    })
                    res.json({ message: "check your email" })
                })
            })
    })
})
module.exports = router;