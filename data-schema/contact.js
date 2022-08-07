const mongoose = require('mongoose');

const contactschema = mongoose.Schema({
    message: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true},
    subject: {type:String, required:true},
});

module.exports = mongoose.model('contact', contactschema);