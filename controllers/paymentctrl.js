var url = require('url');
var urll="xx";
var id;
const fs = require('fs');
const user = require('../data-schema/user');
const nodemailer = require("nodemailer");
exports.rendere = (req,res,next) =>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
    user.findOne({_id:id}).then((User)=>{
      if(!User){
        return res.redirect('/login');
      } 
      var string = encodeURIComponent(User._id); 
      res.render('payment.html',{
        total:User.paymentot,
      });
    })
};