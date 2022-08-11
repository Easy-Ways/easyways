const Cour = require('../data-schema/courses');
const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
var id;
var url = require('url');
var urll="xx";
var nome;
exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(!id){
        return res.redirect('/login');
    }
    user.findOne({_id:id}).then((User)=>{
        urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        var data = url.parse(urll,true);
        var q= data.query;
        nome=q.s;
        Cour.findOne({name: nome,
                    section: User.section
        }).then(
            (resume) => {
                User.last_cour = nome;
                User.save();
                res.render('OurCour.html', {
                    studentuser: User,
                    resumeuser: resume,
                  });
            }
          )
    })
    .catch((error) => {
      console.log(error);
    });
  }