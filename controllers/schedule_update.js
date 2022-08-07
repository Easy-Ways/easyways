var id;
const user = require('../data-schema/user');
const cookieparser = require('cookie-parser');
const Schedule = require('../data-schema/schedule');


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