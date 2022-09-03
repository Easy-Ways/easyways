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
   
    user.findOne({_id:id}).then((User)=>{
      if(!User){
        return res.redirect('/login');
      }
        urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        var data = url.parse(urll,true);
        var q= data.query;
        name=q.m;
        Cour.find({subject: name,
                    section: User.section,
                    type: 'devoir'
        }).then(
            (devoir) => {
              notif.find({class: User.class}).then((nots)=>{
                res.render('Devoirs.html', {
                    studentuser: User,
                    courlist: devoir,
                    notuser: nots,
                  });
              })
            }
          )
    })
    .catch((error) => {
      console.log(error);
    });
  }