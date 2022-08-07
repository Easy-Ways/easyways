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
exports.rendere = (req,res) =>{
    res.render('forgetpass.html',{  
        message:''
    })
}
exports.save = (req,res) =>{
    user.findOne({ email: req.body.email }).then((User)=>{
        const access = oAuth2client.getAccessToken();
        var id = User._id;
            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: 'academy.easyways@gmail.com', // generated ethereal user
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: access
              },

            });
            var htmlstream =fs.readFile("forgettmp.html", 'utf8', function (err, data) {
              var link = "http://localhost:4000/resetpass?id=" + id;
              data = data.replace(/{{link}}/,link);
             let info = ({
              from: ' academy.easyways@gmail.com', // sender address
              to: User.email, // list of receivers
              subject: "Hello ✔ Reset your password", // Subject line
              text: "", // plain text body
              html: data, // plain text body
            });
            transporter.sendMail(info,()=>{
              
              res.render('forgetpass.html',{
                message:'Please Check your mail'
              });
            })
          });
    })
}