const mongoose = require('mongoose');
const msgschema = mongoose.Schema({
    sid: {type:String, required:true},
    name: {type:String, required:true},
    msgsindexes: [{type:Number}],
    msgsSubjects: [{type:String}],
    msgs: [{type:String}],
});

module.exports = mongoose.model('msg', msgschema);