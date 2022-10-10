const sub = require('../data-schema/subscriptions');
var url = require('url');
var urll="xx";
var id;
const fs = require('fs');
const user = require('../data-schema/user');
const nodemailer = require("nodemailer");
var ms,mp,mc,ss,sp,sc,ys,yp,yc,mk,sk,yk,total;
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
        res.clearCookie('id',{path: '/'});
        return res.redirect('/login');
      }
      sub.find({section:User.section}).then((subs)=>{
        for(let i = 0; i < subs.length;i++){
                switch (subs[i].duration){
                    case "monthly":
                        ms=subs[i].subjects;
                        mp=subs[i].prices;
                    	mc=subs[i].class;
                    	mk=subs[i].content;
                    case "semester":
                        ss=subs[i].subjects;
                        sp=subs[i].prices;
                    	sc=subs[i].class;
                    	sk=subs[i].content;
                    case "yearly":
                        ys=subs[i].subjects;
                        yp=subs[i].prices;
                    	yc=subs[i].class;
                    	yk=subs[i].content;
                    default:
                        
                }
            }
        
        
      res.render('Subscription.html',{
        ss:ss,
        sp:sp,
        sc:sc,
        ms:ms,
        mp:mp,
        mc:mc,
        ys:ys,
        yp:yp,
        yc:yc,
        mk:mk,
        sk:sk,
        yk:yk,
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
                                    "July", "August", "September", "October", "November", "December","January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                  ];
             
              
            if(req.body.subject_m || req.body.subject_y || req.body.subject_s) {
              total=0;
              if(req.body.subject_m){
                var m_end = date + ' ' + monthNames[month+1] + ' ' + year;
                obb.subscription_m = req.body.subject_m;
                for(let i='0';i< obb.subscription_m.length;i++){
                  total+=mp[ms.indexOf(obb.subscription_m[i])];
                  obb.m_end[i]=m_end;
                }
              }
              if(req.body.subject_s){
              var s_end = date + ' ' + monthNames[month+4] + ' ' + year;
              obb.subscription_s = req.body.subject_s;
              for(let i='0';i< obb.subscription_s.length;i++){
              total+=sp[ss.indexOf(obb.subscription_s[i])];
              obb.s_end[i]=s_end;
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
              obb.subscription = arr1.concat(obb.subscription_m, obb.subscription_y,obb.subscription_s);
              obb.paymentot= total;
              
            }else{
              return res.render('Subscription.html',{
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
              var link = "https://easy-ways.tn/activate-acc?id=" + id;
             data = data.replace(/{{link}}/,link);
             let info = ({
              from: 'EasySupport <support@easy-ways.tn>', // sender address
              to: obb.email, // list of receivers
              subject: "Hello ✔ Activate your account", // Subject line
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