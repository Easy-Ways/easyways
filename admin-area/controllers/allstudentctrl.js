const User = require('../data-schema/user');
const cookieParser = require('cookie-parser');
var id;
var url = require('url');
var urll="xx";
var userlist;
exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(id!='010101'){
        return res.redirect('/login');
    }
    User.find({type:'Student'}).then((users)=>{
        userlist=users;
        res.render('all-students.html',{

            studentlist:userlist,
            m:''
        })
    })
    
  }
exports.save = (req,res)=>{
    var sid=req.body.sid;
    User.findOne({_id:sid}).then((Student)=>{
        Student.paymentac='1';
        Student.save().then(()=>{
            res.render('all-students.html',{
                studentlist:userlist,
                m:'Student Activated!'
            });
        })
    })
}