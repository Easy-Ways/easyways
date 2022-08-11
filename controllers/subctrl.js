const sub = require('../data-schema/subscriptions');
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
var ms;
var mp;
var ys;
var yp;
var total;
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
      sub.find({section:User.section}).then((subs)=>{
        if(subs[0].duration=='monthly'){
           ms = subs[0].subjects;
           mp = subs[0].prices;
           ys = subs[1].subjects;
           yp = subs[1].prices;
        }else{
           ms = subs[1].subjects;
           mp = subs[1].prices;
           ys = subs[0].subjects;
           yp = subs[0].prices;
        }
        
      res.render('Subscription.html',{
        ms:ms,
        mp:mp,
        ys:ys,
        yp:yp,
        message:' '
      });})
    })
    
};
exports.save = (req,res,next)=>{
    user.findOne({_id: id}, (err, obb) => {
        if(err) {
          console.log(err);
        } else{
          if(!obb){
            
          }else{
            if(req.body.subject) {
              obb.subscription = req.body.subject;
              total=0;
              for(let i='0';i< obb.subscription.length;i++){
                  if(ms.indexOf(obb.subscription[i])!=-1){
                    total+=mp[ms.indexOf(obb.subscription[i])];
                  }
                  else{
                    total+=yp[ys.indexOf(obb.subscription[i])];
                  }
              }
              obb.paymentot= total;
              console.log(total);
            }else{
              return res.render('subscription.html',{
                message: 'Choose at least one subject!'
              })
            }
          }
          
          obb.save(() => {
            
            const access = oAuth2client.getAccessToken();
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
            var htmlstream =fs.readFile("confirmtmp.html", 'utf8', function (err, data) {
              var link = "http://localhost:4000/activate-acc?id=" + id;
             data = data.replace(/{{link}}/,link);
             let info = ({
              from: ' academy.easyways@gmail.com', // sender address
              to: obb.email, // list of receivers
              subject: "Hello ✔", // Subject line
              text: "", // plain text body
              html: data, // plain text body
            });
            transporter.sendMail(info,()=>{
              console.log('')
              res.redirect('/payment?id=' + id);
            })
          });
            
          });
        }
      });
};