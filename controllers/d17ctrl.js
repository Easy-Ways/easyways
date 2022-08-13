const user = require('../data-schema/user');
exports.rendere1 = (req,res,next) =>{
    
      res.render('d17.html',{
        message:'',
        message2:'',
      });
    
};
exports.save = (req,res) =>{
    user.findOne({email:req.body.email}).then((User)=>{
        if(User){
            User.paymentcode = req.body.code;
        User.save().then(()=>{
            return res.render('d17.html',{
                message2:'',
                message:'Your account will be reviewed Soon!',
            });
        })
        }else{
            return res.render('d17.html',{
                message:'',
                message2:'There is no account with this email!',
            });
        }
    })
};