const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
const notification = require('../data-schema/notification');
var id;
exports.rendere = (req,res,next) => {
     id = req.cookies.id;
    if(!id){
        return res.redirect('/login');
    }
    user.findOne({_id: id}).then(
      (userr) => {
        notification.find({class: userr.class}).then((nots)=>{
            res.render('Profile.html', {
                studentuser: userr,
                noteuser: nots,
              });
        })
      }
    ).catch((error) => {
      console.log(error);
    });
  }
  exports.update = (req,res) => {
    user.findOne({_id: id}, (err, obb) => {
      if(err) {
        console.log(err);
      }else{
        if(!obb){
          console.log('nexiste pas');
        }else{
          if(req.body.email_adresse) {
            obb.email = req.body.email_adresse;
          }
          if(req.body.password) {
            obb.password = req.body.password;
          }
          if(req.body.mobile) {
            obb.phone = req.body.mobile;
          }
        }
        obb.save(() => {
          
          res.redirect('/Profile');
        });
      }
    });
  }