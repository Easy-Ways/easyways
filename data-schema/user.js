const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    Fullname: { type : String, unique:true},
    name: {type:String, unique:true},
    phone: { type : Number, unique:true},
    email: { type : String, unique:true},
    pass: { type : String, },
    school: { type : String, },
    section: { type : String, },
    class: { type : String, default:'1'},
    subscription: [{ type: String }],
    status: { type: Number, default:'0'},
    activation: {type: Number, default:'0'},
    reminder1: {type:String, default:'Enter Reminder'},
    reminder2: {type:String, default:'Enter Reminder'},
    reminder3: {type:String, default:'Enter Reminder'},
    reminder4: {type:String, default:'Enter Reminder'},
    last_cour: {type:String, default:'Not Yet!'},
    cour_progress: {type: Number, default:'0' },
    finished_cours: [{ type: String }],
    type: { type : String,default:'Student'},
    paymentac: {type :  Number ,default:0},
    paymentot:{type : Number,default:0},
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);