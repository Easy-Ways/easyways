const user = require('../data-schema/user');
var id;
const bcrypt = require('bcrypt');
const { URLSearchParams } = require('url');
const cookieparser = require('cookie-parser');
exports.signin = (req,res,next)=>{
   user.findOne({ email: req.body.email }).then(
      (User) => {
        if (!User) {
          return res.status(401).render('login.html',{
            message: "User Does Not Exist"
          });
          
        }
        if(User.paymentac==0){
          return res.render('login.html',{
            message:'Account Payment still in progress!'
          })
        }
        
        if(User.status===1){
          return res.render('login.html',{
            message:'User already logged in another device!'
          })
        }

        bcrypt.compare(req.body.password, User.pass).then(
          (valid) => {
            if (!valid) {
              return res.render('login.html',{
               message: "Email and password Combination does not match !"
              });
            }
            
            if (User.activation=='1'){
              User.status='1';
              User.save(() => {
                var id =User._id;
                res.cookie(`id`,id);
                res.status(200).redirect('/home' );
              })
            }else{
              res.render('login.html',{ message: 'Please verify your email to login!'});
            }
          }
        ).catch(
          (error) => {
            
          }
        );
      }
    ).catch(
      (error) => {
        console.log("other");
      }
    );
  }
  exports.rendere = (req,res,next)=>{
    id=req.cookies.id;
    if(id){
      
      return res.redirect('/home');
    }else{
      res.render('login.html',{
        message: " "
     });
    }
      
    }
   
   
