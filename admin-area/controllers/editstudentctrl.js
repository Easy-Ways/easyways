const User = require('../data-schema/user');
const Subscription = require('../data-schema/subscriptions');
const cookieParser = require('cookie-parser');
var id;
var sid;
var url = require('url');
var urll="xx";
var users;
var ms;
var mp;
var ys;
var yp;
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
                users=userr;
                Subscription.find({section: userr.section}).then(
                    (subs) => {
                        if(subs[0].duration=='monthly'){
                            ms = subs[0].subjects;
                            mp = subs[0].prices;
                            ys = subs[1].subjects;
                            yp = subs[1].prices;
                         }else{
                            ms = subs[1].subjects;
                            mp = subs[1].prices;
                            ys = subs[0].subjects;
                            yp = subs[0].prices;
                         }
                        userr.subscription = [];
                        const arr1 = [];
                        userr.subscription = arr1.concat(userr.subscription_m, userr.subscription_y);
                        userr.save().then(()=>{
                            users=userr;
                            res.render('edit-students.html',{
                                users: userr,
                                ms:ms,
                                mp:mp,
                                ys:ys,
                                yp:yp,
                                message:'',
                            })
                        })
                })      
        })
    }else{
        res.redirect('/login');
    }
}

exports.save = (req,res)=>{
    users.class=req.body.class;
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
    if(sub_m){
        User.findByIdAndUpdate( 
            sid,
            { $pull: { subscription_m: sub_m} },
                (err,obb)=>{
                    if(err){
                        console.error(err)
                    }
                    obb.updateOne({
                        $push: { unpaid: sub_m }
                    })
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
                    obb.updateOne({
                        $push: { unpaid: sub_y }
                    }).then(()=>{
                        console.log('succ');
                    })
                    res.redirect('/edit-students?id=' + sid );
                }
        )
    }
}

exports.add = (req,res) =>{
    var mis=req.body.mis;
    var yis=req.body.yis;
    const d = new Date();
              var year = d.getFullYear();
              const month = d.getMonth();
              const date = d.getDate();
              const monthNames = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                  ];
    if(mis){
        var m_end = date + ' ' + monthNames[month+1] + ' ' + year;
        User.findByIdAndUpdate( 
            sid,
            { $push: { subscription_m: mis , m_end: m_end} },
                (err,obb)=>{
                    if(err){
                        console.error(err)
                    } 
                }
            )
        }
    if(yis){
        year+=1;
        var y_end = date + ' ' + monthNames[month] + ' ' + year;
        User.findByIdAndUpdate( 
            sid,
            { $push: { subscription_y: yis, y_end: y_end} },
                (err,obb)=>{
                    if(err){
                        console.error(err)
                    }
                    
                }
        )
    }
    res.redirect('/edit-students?id=' + sid );
}