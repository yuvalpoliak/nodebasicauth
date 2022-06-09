const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

//connect to db
mongoose.connect(process.env.MONGODBCONNECT,
() => {
    console.log('mongoose connected')
})
//middleware
app.use(express.json())

//import middleware
const authRouter = require('./routes/auth');

//route middleware
app.use('/api/user',authRouter)

app.listen(3000, ()=> {console.log('server is running')})

