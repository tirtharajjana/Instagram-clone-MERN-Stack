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
const { SENDGRID_API, EMAIL } = require('../config/keys')

//


const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: SENDGRID_API
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
                                html: "<h1>Welcome to instagram, You have completed Your Sign up process,<br>Thank you</h1>"
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
                        <h5>Click this <a href="${EMAIL}/reset/${token}" >link</a> to reset password</h5>
                        `
                    })
                    res.json({ message: "check your email" })
                })
            })
    })
})

router.post('/new-password', (req, res) => {
    const newPassword = req.body.password;
    const sentToken = req.body.token;
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "Try again, session expired" })
            }
            bcrypt.hash(newPassword, 12).then(hashedPassword => {
                user.password = hashedPassword;
                user.resetToken = undefined;
                user.expireToken = undefined;
                user.save().then((saveUser) => {
                    res.json({ message: "Password updated successfully" })
                })
            })
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;