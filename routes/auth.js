const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hi")
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(422).json({ error: "please add all fields" })
    }
    else {
        return res.status(200).json({ message: "Success" })
    }
})

module.exports = router;