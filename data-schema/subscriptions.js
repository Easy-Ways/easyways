const mongoose = require('mongoose');
const subschema = mongoose.Schema({
    section:{type:String},
    duration:{type:String},
    subjects:[{type:String}],
    prices:[{type:Number}],
})
module.exports = mongoose.model('subscription', subschema); 