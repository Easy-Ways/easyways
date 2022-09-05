var url = require('url');
var urll="xx";
const user = require('../data-schema/user');
const msg = require('../data-schema/messages');
const messages = require('../data-schema/messages');
exports.save = (req,res) =>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    id=q.id;
    user.findOne({_id:id}).then((User)=>{
        if(!User){
           return res.redirect('/login');
        }
        const msg = new messages({
            id:User.id,
            name:User.Fullname,
        })
        msg.save().then(()=>{
            User.activation='1';
            User.save().then(()=>{
                res.redirect('/login');
            })
        })
        
    })
   
}