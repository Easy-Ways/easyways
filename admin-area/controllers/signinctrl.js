const user = require('../data-schema/user');
var id;
const bcrypt = require('bcrypt');
const { URLSearchParams } = require('url');
const cookieparser = require('cookie-parser');
exports.signin = (req,res,next)=>{
    if(req.body.email!='academy.easyways@gmail.com' || req.body.password!='01we-started-all-this-in-PapaJhons01')
    {
     return res.render('admin-login.html',{
        message:'Nice Try ! come again',
      })
    }
    res.cookie(`id`,'010101');
    res.redirect('/home');
  }
  exports.rendere = (req,res,next)=>{
    var id=0;
    if(req.cookies){
      id=req.cookies.id;}
    if(id=='010101'){
      return res.redirect('/home');
    }else{
      res.render('admin-login.html',{
        message: " "
     });
    }
      
    }
   
   
