const User = require('../data-schema/user');

exports.rendere = (req,res) =>{
    var id = req.cookies.id;
    if(id=='010101'){
        res.render('class-uploader.html',{
            message:'',
            message2:'',
        })
    }else{
        res.redirect('/login');
    }
}
exports.save = (req,res)=>{
    User.findOne({email:req.body.email,type:'Student'}).then((user)=>{
        if(user){
            user.class=req.body.class;
            user.save().then(()=>{
                res.render('class-uploader.html',{
                    message:'Class Updated',
                    message2:'',
                })
            })
        }else{
            res.render('class-uploader',{
                message:'',
                message2:'Student Not Found'
            })
        }
        

    })
}