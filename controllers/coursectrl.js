const Cour = require('../data-schema/courses');
const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
const notif = require('../data-schema/notification');
var id;
var url = require('url');
var urll="xx";
var name;
exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(!id){
        return res.redirect('/login');
    }
    user.findOne({_id:id}).then((User)=>{
        urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        var data = url.parse(urll,true);
        var q= data.query;
        name=q.m;
        Cour.find({subject: name,
                    section: User.section
        }).then(
            (cours) => {
              notif.find({class: User.class}).then((nots)=>{
                res.render('Courses.html', {
                    studentuser: User,
                    courlist: cours,
                    noteuser: nots,
                  });
              })
            }
          )
    })
    .catch((error) => {
      console.log(error);
    });
  }