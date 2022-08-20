const User = require('../data-schema/user');
const cookieParser = require('cookie-parser');
var id;
var sid;
var url = require('url');
var urll="xx";
var users;
exports.rendere = (req,res) =>{
    urll = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    var data = url.parse(urll,true);
    var q= data.query;
    sid=q.id;
    if(!sid){
        sid=req.body.sid;
    }
    var id = req.cookies.id;
    if(id=='010101'){
        User.findById(sid).then(
            (userr) => {
                userr.subscription = [];
                const arr1 = [];
                userr.subscription = arr1.concat(userr.subscription_m, userr.subscription_y);
                userr.save().then(()=>{
                    users=userr;
                    res.render('edit-students.html',{
                    users: userr,
                    message:'',
                })
                })
                
            })
    }else{
        res.redirect('/login');
    }
}

exports.save = (req,res)=>{
    console.log('user' , req.body.class);
    users.class=req.body.class;
    console.log(users.class);
    users.save().then(()=>{
        res.redirect('/edit-students?id=' + sid );
    })        
}
    
exports.activate = (req,res)=>{
    users.paymentac='1';
    users.save().then(()=>{
        res.redirect('/edit-students?id=' + sid );
    })
    
}

exports.sub = (req,res) => {
    var sub_m=req.body.sub_m;
    var sub_y=req.body.sub_y;
    var i=req.body.i;
    if(sub_m){
        User.findByIdAndUpdate( 
            sid,
            { $pull: { subscription_m: sub_m} },
                (err,obb)=>{
                    if(err){
                        console.error(err)
                    }
                    res.redirect('/edit-students?id=' + sid );
                }
        )
    }
    if(sub_y){
        User.findByIdAndUpdate( 
            sid,
            { $pull: { subscription_y: sub_y}},
                (err,obb)=>{
                    if(err){
                        console.error(err)
                    }
                    res.redirect('/edit-students?id=' + sid );
                }
        )
    }
}