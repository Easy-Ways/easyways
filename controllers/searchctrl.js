const Cour = require('../data-schema/courses');
const cookieParser = require('cookie-parser');
const user = require('../data-schema/user');
const notification = require('../data-schema/notification');
exports.search = (req,res,next) => {
    const cour = req.query.searchs;
    const id = req.cookies.id;
    if(!id){
      return res.redirect('/login');
  }
    Cour.find({name: {$regex: new RegExp('^' + cour + '.*')} }).then(
          (cours) => {
            user.findOne({_id:id}).then((User)=>{
                notification.find({class: User.class}).then((nots)=>{
                    res.render('Courses.html',{
                        courlist: cours,
                        studentuser: User,
                        notuser: nots,
                      });
                }
                    
                )
            })
          }).catch((error) => {
          console.log(error);
        });
  }