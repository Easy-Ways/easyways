var url = require('url');
var urll="xx";
const user = require('../data-schema/user');
exports.save = (req,res) =>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
    user.findOne({_id:id}).then((User)=>{
        User.activation='1';
        User.save()
    })
    res.redirect('/login');
}