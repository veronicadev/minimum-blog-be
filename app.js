const PORT = process.env.PORT || '8080';
const MONGODB_URI = process.env.MONGODB_URI;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const feedRoutes = require('./routes/feed');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(feedRoutes);


/*CONNECTION DB & SERVER START*/
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Mongoose started');
        app.listen(PORT, () => {
            console.log("SERVER STARTERD");
        });
    })
    .catch(error => {
        console.error(error);
    })