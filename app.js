const PORT = process.env.PORT || '8080';
const express = require('express');
const bodyParser = require('body-parser');
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
app.listen(PORT, () => {
    console.log("SERVER STARTERD");
});