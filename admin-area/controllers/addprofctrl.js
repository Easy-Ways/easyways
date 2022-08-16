const User = require('../data-schema/user');
const cookieParser = require('cookie-parser');
var id;
var url = require('url');
var urll="xx";

exports.rendere = (req,res,next) => {
    id=req.cookies.id;
    if(id!='010101'){
        return res.redirect('/login');
    }
        res.render('add-professor.html',{
            message:'',
            message2:'',
        }
        )
  }
exports.save = (req,res)=>{
    User.findOne({email:req.body.email}).then((userr)=>{
        if(userr){
            return res.render('add-professor.html',{
                message:'',
                message2:'Teacher Already exists',
            })
        }else{
            const user = new User({
                name:req.body.name,
                Fullname:req.body.fullname,
                subscription:req.body.subjects,
                section:req.body.section,
                phone:req.body.phone,
                email:req.body.email,
                type:'Teacher',
                paymentcode:req.body.d17,
                paymentac:'1',
                facebook:req.body.facebook,
                instagram:req.body.instagram,
            })
            
            user.save().then(()=>{
                res.render('add-professor.html',{
                    message:'Teacher Created Successfuly',
                    message2:'',
                })
            })
        }
    })
  
}