const mongoose = require('mongoose');

const usersschema = mongoose.Schema({
    name: {type:String},
    mobile: {type:String},
    section: {type:String},
    email_adresse: {type:String},
    password: {type:String},
    subscription: [{type:String}],
    Fullname: {type:String},
    reminder1: {type:String},
    reminder2: {type:String},
    reminder3: {type:String},
    reminder4: {type:String},
    last_cour: {type:String},
    cour_progress: {type:Number},
});

module.exports = mongoose.model('User', usersschema);