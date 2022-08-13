const Schedule = require('../data-schema/schedule');
exports.rendere = (req,res,next)=>{
    res.render('scheduleuploader.html',{
        message:''
    });
    
   };

exports.save = (req,res,next)=>{
    Schedule.findOne({class: req.body.class, section: req.body.section})
    .then((sched)=>{
        var date = req.body.day;
        if(sched){
            if(req.body.m1){
                sched.m1[date]= req.body.m1;
            }
            if(req.body.m2){
                sched.m2[date]= req.body.m2;
            }
            if(req.body.m3){
                sched.m3[date]= req.body.m3;
            }
            if(req.body.m4){
                sched.m4[date]= req.body.m4;
            }
        sched.save().then(()=>{
            res.render('scheduleuploader.html',{
                message:'Schedule updated !'
            });
        })
        }else{
            const sch = new Schedule({
                class: req.body.class,
                section: req.body.section,
            })
            for(let i = 0; i <= 6; i++){
                sch.m1[i]='*';
                sch.m2[i]='*';
                sch.m3[i]='*';
                sch.m4[i]='*';
            }
            sch.save().then(()=>{
                res.render('scheduleuploader.html',{
                    message:'Schedule created newly, please fill again!'
                })
            })
        }
        
    }).catch((err)=>{
        console.error(err)
    })
   };