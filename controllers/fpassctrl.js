const fs = require('fs');
const user = require('../data-schema/user');
const nodemailer = require("nodemailer");
exports.rendere = (req,res) =>{
    res.render('forgetpass.html',{  
        message:''
    })
}
exports.save = (req,res) =>{
    user.findOne({ email: req.body.email }).then((User)=>{
      if (User){
        var id = User._id;
            let transporter = nodemailer.createTransport({
              host:'mail.easy-ways.tn',
              port: 587,
              auth: {
                user:'support@easy-ways.tn',
                pass:'01-Easyways-01',
              },
              tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
              },

            });
            var htmlstream =fs.readFile("forgettmp.html", 'utf8', function (err, data) {
              var link = "http://localhost:4000/resetpass?id=" + id;
              data = data.replace(/{{link}}/,link);
             let info = ({
              from: ' support@easy-ways.tn', // sender address
              to: User.email, // list of receivers
              subject: "Hello ✔ Reset your password", // Subject line
              text: "", // plain text body
              html: data, // plain text body
            });
            transporter.verify(function (error, success) {
              if (error) {
                console.log(error);
              } else {
                console.log("Server is ready to take our messages");
              }
            });
            transporter.sendMail(info,()=>{
              
              res.render('forgetpass.html',{
                message:'Please Check your mail'
              });
            })
          });
        }else{
          res.render('forgetpass.html',{
            message:'User not found',
          })
        }
    })
}