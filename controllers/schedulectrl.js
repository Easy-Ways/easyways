var id;
const user = require('../data-schema/user');
const Schedule = require('../data-schema/schedule');
const cookieparser = require('cookie-parser');
const notif = require('../data-schema/notification');
exports.rendere = (req,res,next)=>{  
    id=req.cookies.id;
  
    user.findOne({ _id: id}).then(
        (userr) => {
          if(!userr){
            return res.redirect('/login');
          }
                    notif.find({ class: userr.class , section:userr.section}).then((not)=>{
                        Schedule.findOne({class: userr.class , section:userr.section}).then((sch) => {
                            res.render('Schedule.html', {
                                studentuser: userr,
                                scheduleuser: sch,
                                notuser: not,
                              });
                        })
                    })
                  }
                ).catch((error) => {
              console.log(error);
            });
       }