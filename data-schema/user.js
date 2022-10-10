const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    Fullname: { type : String, },
    name: {type:String, },
    phone: { type : Number, unique:true},
    email: { type : String, unique:true},
    pass: { type : String, },
    school: { type : String, },
    section: { type : String, },
    class: { type : String, default:'1'},
    subscription: [{ type: String }],
    subscription_m: [{ type: String }],
    subscription_y: [{ type: String }],
    subscription_s: [{ type: String }],
    m_end: [{ type:String}],
    y_end: [{ type:String}],
    s_end: [{ type:String}],
    unpaid: [{type:String,default:'None'}],
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
    paymentcode:{type: String},
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);