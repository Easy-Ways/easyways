const user = require('../data-schema/user');
const bcrypt = require('bcrypt');
exports.signup = (req,res,next)=>{
bcrypt.hash(req.body.password,10)
.then((hash)=>{
    const User = new user({
        Fullname: req.body.fullname,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        pass: hash,
        school: req.body.school,
    })
    
    User.save()
        .then(()=>{
            console.log("Info saved");
            var string = encodeURIComponent(User._id);
            if(User.school === "Lycee"){
                res.redirect('/sectionl?id=' + string);}
            else{
                res.redirect('/sectionf?id=' + string);}
            }
            
        )
        .catch((error)=>{
            console.error(error);
            res.render('register.html',{
                message: "User Already Exists!"
            })
        })
})
   
};
exports.rendere = (req,res,next)=>{
    res.render('register.html',{
        message: " "
    });
 };