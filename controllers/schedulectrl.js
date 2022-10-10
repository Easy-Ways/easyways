var id;
const user = require('../data-schema/user');
const event = require('../data-schema/event');
const cookieparser = require('cookie-parser');
const notif = require('../data-schema/notification');
exports.rendere = (req,res,next)=>{  
    id=req.cookies.id;
  if(!id){
    return res.redirect('/login');}
    user.findOne({ _id: id}).then(
        (userr) => {
          if(!userr){
            res.clearCookie('id',{path: '/'});
            return res.redirect('/login');
          }
                    notif.find({ class: userr.class , section:userr.section}).then((not)=>{
                        event.find({class: userr.class , section:userr.section}).then((sch) => {
                          var events=[];
                            for(let i = 0; i<sch.length;i++){
                              switch (sch[i].day){
                                case "Monday":
                                  events[0]=sch[i]
                                case "Tuesday":
                                  events[1]=sch[i]
                                case "Wednesday":
                                  events[2]=sch[i]
                                case "Thursday":
                                  events[3]=sch[i]
                                case "Friday":
                                  events[4]=sch[i]
                                case "Saturday":
                                  events[5]=sch[i]
                                case "Sunday":
                                  events[6]=sch[i]
                              }
                            }
                            res.render('Schedule.html', {
                                studentuser: userr,
                                scheduleuser:events,
                                notuser: not,
                              });
                        })
                    })
                  }
                ).catch((error) => {
              console.log(error);
            });
       }