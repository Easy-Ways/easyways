const User = require('../data-schema/user');
const cookieParser = require('cookie-parser');
var id;
var url = require('url');
var urll="xx";

exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(id!='010101'){
        return res.redirect('/login');
    }
    User.find().then((users)=>{
        res.render('all-students.html',{
            studentlist:users,
        })
    })
    
  }