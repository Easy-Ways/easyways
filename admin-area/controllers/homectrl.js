const cookieparser = require('cookie-parser');
const User = require('../data-schema/user');
const Cour = require ('../data-schema/courses') ;
exports.rendere = (req,res,next)=>{ 
      var id =req.cookies.id;
        if(id=='010101'){   
          User.find({type: 'Student'}).then(
            (users) => {
              
                        res.render('home-admin.html', {
                          studentlist: users,
                          }); 
                      }
                    ).catch((error) => {
                  console.log(error);
                });
     
                     }else{
                      return res.redirect('/login');
                     }
     
    }
