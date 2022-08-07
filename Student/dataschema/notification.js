const mongoose = require('mongoose');

const notificationschema = mongoose.Schema({
    time: {type:String},
    titre: {type:String},
    message: {type:String},
    class: {type: String},
});

module.exports = mongoose.model('Notification', notificationschema);