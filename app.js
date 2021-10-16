const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys')
require('./models/user');

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log("Connected");
})
mongoose.connection.on('error', (err) => {
    console.log("error", err);
})


const PORT = 5000;


app.get('/', (req, res) => {
    res.send("hi");
})

app.listen(PORT, () => console.log('Server is running on', PORT));