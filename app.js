const PORT = process.env.PORT || '8080';
const express = require('express');
const app = express();
const feedRoutes = require('./routes/feed');


app.use(feedRoutes);
app.listen(PORT, ()=>{
    console.log("SERVER STARTERD");
});