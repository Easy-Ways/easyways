const Cour = require('../data-schema/courses');
const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
const Notif = require('../data-schema/notification');
var id;
var url = require('url');
var urll="xx";
var nome;
exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    
    user.findOne({_id:id}).then((User)=>{
      if(!User){
        return res.redirect('/login');
      }
        urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        var data = url.parse(urll,true);
        var q= data.query;
        nome=q.s;
        Cour.findOne({name: nome,
                    section: User.section
        }).then(
            (resume) => {
              User.last_cour = resume.name;
              User.save();
              Notif.find({class: User.class}).then((nots)=>{
                res.render('OurCour.html', {
                    studentuser: User,
                    resumeuser: resume,
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