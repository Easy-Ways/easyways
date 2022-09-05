const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const io = require('socket.io')(6000);
const home = require('./routers/home')
io.on("connection", socket=>{
    console.log(socket.id);
})
app.use('/home',home).listen(6000);