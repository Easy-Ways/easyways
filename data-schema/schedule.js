const mongoose = require('mongoose');
const scheduleSchema = mongoose.Schema({
    class: { type : String},
    section: { type : String},
    time: [[{ type : String}],
            [{ type : String}],
            [{ type : String}],
            [{ type : String}],
            [{ type : String}]],

});
module.exports = mongoose.model('Schedule', scheduleSchema);    