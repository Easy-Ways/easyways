const mongoose = require('mongoose');
const forumschema = mongoose.Schema({
    tid: {type:String, required:true},
    name: {type:String, required:true},
    section : {type:String},
    Qst: {type:String},
    Subject: {type:String},
    Body: {type:String},
});

module.exports = mongoose.model('forum', forumschema);