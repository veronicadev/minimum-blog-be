const PORT = process.env.PORT || '8081';
const MONGODB_URI = process.env.MONGODB_URI;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const multer = require('multer');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        const currentDate = new Date().toISOString().replace(/:/g, "-");
        cb(null, currentDate + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    console.log(file)
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        cb(null, true);
    }else {
        cb(null, false);
    }
}
const multerObj = {
    storage:fileStorage,
    fileFilter: fileFilter
};

app.use(multer(multerObj).single('image'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(feedRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use((err, req, res, next)=>{
    console.log(err);
    const message = err.message;
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: message
    })
})

/*CONNECTION DB & SERVER START*/
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    console.log('Mongoose started');
    const server = app.listen(PORT, () => {
        console.log("SERVER STARTERD");
    });
    const io = require('./utils/socket').init(server);
    io.on('connection', socket =>{
        console.log('Client connected');
    })
})
.catch(error => {
    next(err);
})