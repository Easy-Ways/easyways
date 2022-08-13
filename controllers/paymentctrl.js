var url = require('url');
var urll="xx";
var id;
const fs = require('fs');
const user = require('../data-schema/user');
const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const CLIENT_ID = '988327614379-vdl29tbl9gh0ar8pinstc5lg888ck3up.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground/';
const REFRESH_TOKEN = '1//04a3x4OFqrFGZCgYIARAAGAQSNwF-L9Ir6zFzlaAouALyL7sdEkCScXCkD27rlLk2bzhz_Gq7UJ2j5RRpeNdPIFvgx1cHlviXSf4';
const oAuth2client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2client.setCredentials({refresh_token: REFRESH_TOKEN});
exports.rendere = (req,res,next) =>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
    if(!id){
      return res.redirect('/login');
    }
    user.findOne({_id:id}).then((User)=>{ 
      var string = encodeURIComponent(User._id); 
      res.render('payment.html',{
        total:User.paymentot,
      });
    })
};