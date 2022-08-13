const mongoose = require('mongoose');
const scheduleSchema = mongoose.Schema({
    class: { type : String},
    section: { type : String},
    m1:[{type: String,default:'*'}],
    m2:[{type: String,default:'*'}],
    m3:[{type: String,default:'*'}],
    m4:[{type: String,default:'*'}],

});
module.exports = mongoose.model('Schedule', scheduleSchema);    