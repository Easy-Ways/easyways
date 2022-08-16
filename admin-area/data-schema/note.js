const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
    name: { type:String, default:'Enter Name'},
    department: {type:String, default:'Enter Department'},
    message: {type:String, default:'Enter Message'},
    subject: {type:String, default:'Enter Subject'},
});
module.exports = mongoose.model('Note',noteSchema);