const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
const notification = require('../data-schema/notification');
const subscription = require('../data-schema/subscriptions');
const Contact = require('../data-schema/contact');
const forum = require('../data-schema/forum');
var id;
const fs = require('fs');

exports.rendere = (req,res,next) => {
     id = req.cookies.id;
  if(!id){
    return res.redirect('/login');}
    user.findOne({_id: id}).then(
      (userr) => {
        if(!userr){
          res.clearCookie('id',{path: '/'});
          return res.redirect('/login');
        }
        notification.find({class: userr.class, section:userr.section}).then((nots)=>{
          subscription.findOne({section: userr.section,duration:"monthly"}).then((subs) => {
            forum.find({section:userr.section}).then((forums)=>{
            res.render('forum.html', {
              forums:forums,
              studentuser: userr,
              notuser: nots,
              sublist: subs,
            });})
          })
        })
      }).catch((error) => {
      console.log(error);
    });
  }