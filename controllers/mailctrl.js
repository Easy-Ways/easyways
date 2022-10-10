const Cour = require('../data-schema/courses');
const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
const notif = require('../data-schema/notification');
const msg = require('../data-schema/messages');
var id;
exports.rendere = (req,res,next) => {
    id=req.cookies.id;
   	if(!id){
      return res.redirect('/login');}
    user.findOne({_id:id}).then((User)=>{
      if(!User){
        res.clearCookie('id',{path: '/'});
        return res.redirect('/login');
      }
      notif.find({ class: User.class, section:User.section}).then((not)=>{
        msg.findOne({sid:User._id}).then((msgs)=>{
            res.render('mailbox.html', {
                studentuser: User,
                notuser: not,
                msgs:msgs,
              });
        })
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }