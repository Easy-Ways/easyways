const user = require('../data-schema/user');
exports.rendere2 = (req,res,next) =>{
    res.render('bank.html',{
        message:'',
        message2:'',
    });
};
exports.save = (req,res) =>{
  user.findOne({email:req.body.email}).then((User)=>{
    if(User){
        User.paymentcode = req.body.code;
    User.save().then(()=>{
        return res.render('bank.html',{
            message:'Your account will be reviewed Soon!',
            message2:'',
        });
    })
    }else{
        return res.render('bank.html',{
            message:'',
            message2:'There is no account with this email!',
        });
    }
  })
};