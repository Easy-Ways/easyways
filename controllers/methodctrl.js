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
                    section: User.section,
                    type: 'method'
        }).then(
            (method) => {
              notif.find({class: User.class}).then((nots)=>{
                res.render('Methods.html', {
                    studentuser: User,
                    courlist: method,
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