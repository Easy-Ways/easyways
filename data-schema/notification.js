const mongoose = require('mongoose');

const notificationschema = mongoose.Schema({
    time: {type:String},
    title: {type:String},
    message: {type:String},
    class: {type: String},
    section: {type: String},
});

module.exports = mongoose.model('Notification', notificationschema);