const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/keys');

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth.js'));
app.use(require('./routes/post.js'));
app.use(require('./routes/user.js'));

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


const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send("hi");
})

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => console.log('Server is running on', PORT));