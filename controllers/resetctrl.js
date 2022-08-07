const user = require('../data-schema/user');
var url = require('url');
var urll="xx";
var id;
const bcrypt = require('bcrypt');
exports.rendere = (req,res) =>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
    if(!id){
      return res.redirect('/login');
    }
    res.render("reset-pass.html");

}
exports.save = (req,res) =>{
    console.log(req.body.password);
    bcrypt.hash(req.body.password,10)
     .then((hash)=>{
    user.findOne({ _id:id }).then((User)=>{
        User.save()
        .then(()=>{
            res.redirect('/login');
        })
    })    
    })
}