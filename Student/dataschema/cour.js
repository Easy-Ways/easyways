const mongoose = require('mongoose');

const courschema = mongoose.Schema({
    name: {type:String},
    test: {type:Number},
    resume: {type:String},
    method: {type:String},
    exercice: {type:String},
    devoir: {type:String},
});

module.exports = mongoose.model('Cour', courschema);