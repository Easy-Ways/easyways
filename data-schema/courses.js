const mongoose = require('mongoose');
const coursesSchema = mongoose.Schema({
    name: { type:String},
    hours: {type:Number},
    diff: {type:String},
    type: {type:String},
    image: { type:String },
    teacher: {type:String},
    section: {type:String},
    subject: {type:String},
    images: { type:String },
    pdf: { type:String },
    video: { type:String },
    
});
module.exports = mongoose.model('Course',coursesSchema);