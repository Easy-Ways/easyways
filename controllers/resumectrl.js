const Resume = require('../data-schema/resume');
const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
var id;
var url = require('url');
var urll="xx";
var nome;
exports.rendere = (req,res,next) => {
    id=req.cookies.id;
   if(!id){
     return res.redirect('/login');}
    user.findOne({_id:id}).then((User)=>{
      if(!User){
        res.clearCookie('id',{path: '/'});
        return res.redirect('/login');
      }
        urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        var data = url.parse(urll,true);
        var q= data.query;
        nome=q.s;
        Resume.find({name: nome,
                    section: User.section
        }).then(
            (resumes) => {
                res.render('OurCour.html', {
                    studentuser: User,
                    resumeuser: resumes,
                  });
            }
          )
    })
    .catch((error) => {
      console.log(error);
    });
  }