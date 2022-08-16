const cookieparser = require('cookie-parser');
const User = require('../data-schema/user');
const Cour = require ('../data-schema/courses') ;
const Note = require('../data-schema/note');
exports.rendere = (req,res,next)=>{ 
      var id =req.cookies.id;
        if(id=='010101'){
          User.find({type: 'Student' , paymentac: '0'}).then(
            (users) => {
              Note.findOne().then(
                (notes) => {
                  res.render('home-admin.html', {
                    studentlist: users,
                    notelist: notes,
                    }); 
                }
              )
            }).catch((error) => {
                  console.log(error);
                });
                     }else{
                      return res.redirect('/login');
                     }
     }
     

    

exports.note = (req,res) => {
  Note.findOne( {} , (err, Obj) => {
    if(err) {
      console.log(err);
    } else{
      if(!Obj){
        console.log('nexiste pas');
      }else{
        if(req.body.name) {
          Obj.name = req.body.name;
        }
        if(req.body.department) {
          Obj.department = req.body.department;
        }
        if(req.body.subject) {
          Obj.subject = req.body.subject;
        }
        if(req.body.message) {
          Obj.message = req.body.message;
        }
      }
      Obj.save((err,upd) => {
        res.redirect('/home');
      });
    }
  });
}