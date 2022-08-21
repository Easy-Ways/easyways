const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
const notification = require('../data-schema/notification');
const subscription = require('../data-schema/subscriptions');
var id;
const fs = require('fs');
const nodemailer = require('nodemailer');
exports.rendere = (req,res,next) => {
     id = req.cookies.id;
    if(!id){
        return res.redirect('/login');
    }
    user.findOne({_id: id}).then(
      (userr) => {
        notification.find({class: userr.class}).then((nots)=>{
            res.render('Profile.html', {
                studentuser: userr,
                noteuser: nots,
              });
        })
      }
    ).catch((error) => {
      console.log(error);
    });
  }
  exports.update = (req,res) => {
    user.findOne({_id: id}, (err, obb) => {
      if(err) {
        console.log(err);
      }else{
        if(!obb){
          console.log('nexiste pas');
        }else{
          if(req.body.email_adresse) {
            obb.email = req.body.email_adresse;
          }
          if(req.body.password) {
            obb.password = req.body.password;
          }
          if(req.body.mobile) {
            obb.phone = req.body.mobile;
          }
          obb.activation ='0';
        }
        obb.save(() => {
          
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
          var htmlstream =fs.readFile("confirmtmp.html", 'utf8', function (err, data) {
            var link = "http://localhost:4000/activate-acc?id=" + id;
           data = data.replace(/{{link}}/,link);
           let info = ({
            from: ' support@easy-ways.tn', // sender address
            to: obb.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "", // plain text body
            html: data, // plain text body
          });
          transporter.sendMail(info,()=>{
          
            res.redirect('/home/disconnect');
          }) 
        });
        });
      }
    });
  }
exports.updatesub = (req,res)=>{
    user.findById(id).then((User)=>{ 
        subscription.findOne({section:User.section,duration:"monthly"}).then((Sub)=>{
          var indexs=[];
          for(var i=0;i<req.body.newsubs.length;i++){
            User.paymentot+=Sub.prices[Sub.subjects.indexOf(req.body.newsubs[i])];
          }
          console.log(User.paymentot);
          User.save().then(()=>{
            res.redirect('/profile');
          })
        })
    })   
}