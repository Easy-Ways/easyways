var id;
const user = require('../data-schema/user');
const cookieparser = require('cookie-parser');
const Cour = require ('../data-schema/courses') ;
const notif = require('../data-schema/notification');
exports.rendere = (req,res,next)=>{  
    id=req.cookies.id;
    if(!id){
      return res.redirect('/login');
    }
    user.findOne({ _id: id}).then(
      (userr) => {
                  notif.find({ class: userr.class, section:userr.section}).then((not)=>{
                    res.render('home.html', {
                      studentuser: userr,
                      notuser: not,
                    });
                  })
                }
              ).catch((error) => {
            console.log(error);
          });
     }
//update reminder
exports.reminder = (req,res) => {
  user.findOne({_id: id}, (err, Obj) => {
    if(err) {
      console.log(err);
    } else{
      if(!Obj){
        console.log('nexiste pas');
      }else{
        if(req.body.reminder1) {
          Obj.reminder1 = req.body.reminder1;
        }
        if(req.body.reminder2) {
          Obj.reminder2 = req.body.reminder2;
        }
        if(req.body.reminder3) {
          Obj.reminder3 = req.body.reminder3;
        }
        if(req.body.reminder4) {
          Obj.reminder4 = req.body.reminder4;
        }
      }
      Obj.save((err,upd) => {
        res.redirect('/home');
      });
    }
  });
}
 
 //discoonect function
 exports.disconnect = (req,res) =>{
    user.findOne({ _id : id }).then(
      (user) => {
        user.status='0';
        user.save().then(()=>{
          res.clearCookie('id',{path: '/'});
          res.redirect('/login');
        })
      }).catch((error)=>{
        console.error(error);
  })};
  