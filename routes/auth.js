const router = require ('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

router.post('/register', async (req, res) =>{

    //check if email already exists
    const existingEmail = await User.findOne({ email: req.body.email  })
    if (existingEmail) return res.status(400).send('email already exists in the system')

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    }) 
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err)
    }
} )

router.post('/login', async (req,body) => {
    //check if the user exists
    const existingUser = await User.findOne({ email: req.body.email  })
    if (!existingUser) return res.status(400).send('email dosent exists in the system')
    //check password
    const validPassword = await bcrypt.compare(req.body.password, existingUser.password)
    if(!validPassword) return res.status(400).send('wrong password')

    //create and assign a token to the user
    const token = jwt.sign({ _id: existingUser._id}, process.env.TOKEN_SECRET)
    res.header('auth_token', token).send(token)
})

module.exports = router;