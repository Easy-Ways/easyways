const sub = require('../data-schema/subscriptions');
var url = require('url');
var urll="xx";
var id;
const fs = require('fs');
const user = require('../data-schema/user');
const nodemailer = require("nodemailer");
var ms;
var mp;
var ys;
var yp;
var total;
exports.rendere = (req,res,next) =>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
    if(!id){
      return res.redirect('/login');
    }
    user.findOne({_id:id}).then((User)=>{
      if(!User){
        return res.redirect('/login');
      }
      sub.find({section:User.section}).then((subs)=>{
        console.log(subs);
        console.log(subs[0]);
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
            res.redirect('/login');
          }else{
            const d = new Date();
              var year = d.getFullYear();
              const month = d.getMonth();
              const date = d.getDate();
              const monthNames = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                  ];
             
              
            if(req.body.subject_m || req.body.subject_y ) {
              total=0;
              if(req.body.subject_m){
                var m_end = date + ' ' + monthNames[month+1] + ' ' + year;
                obb.subscription_m = req.body.subject_m;
                for(let i='0';i< obb.subscription_m.length;i++){
                  total+=mp[ms.indexOf(obb.subscription_m[i])];
                  obb.m_end[i]=m_end;
                }
              }
              if(req.body.subject_y){
                obb.subscription_y = req.body.subject_y;
                year+=1;
                var y_end = date + ' ' + monthNames[month] + ' ' + year;
                for(let i='0';i< obb.subscription_y.length;i++){
                  total+=yp[ys.indexOf(obb.subscription_y[i])];
                  obb.y_end[i]=y_end;
                }
              }
              const arr1 = [];
              obb.subscription = arr1.concat(obb.subscription_m, obb.subscription_y);
              obb.paymentot= total;
              console.log('monthly:',obb.m_end,'yearly:',obb.y_end);
            }else{
              return res.render('subscription.html',{
                message: 'Choose at least one subject!'
              })
            }
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
              
              res.redirect('/payment?id=' + id);
            }) 
          });
            
          });
        }
      });
};