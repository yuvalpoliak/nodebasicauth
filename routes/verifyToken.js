const jwt = require('jsonwebtoken');

//a middleware to verify that a user is registered and if he is give him an access
module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch{
        res.status(400).send('invalid token')
    }
}