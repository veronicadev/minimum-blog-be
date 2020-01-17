const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) =>{
    console.log(req.get('Authorization'))
    const authorization = req.get('Authorization');
    if(!authorization){
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authorization.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    }catch(err){
        err.statusCode = 401;
        next(err);
    }
    if(!decodedToken){
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.user = {
        id: decodedToken.userId,
        email: decodedToken.email
    };
    next();
}