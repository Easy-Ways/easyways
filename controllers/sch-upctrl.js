const Schedule = require('../data-schema/schedule');
exports.rendere = (req,res,next)=>{
    res.render('scheduleuploader.html');
    
   };
exports.save = (req,res,next)=>{
    Schedule.findOne({class: req.body.class, section: req.body.section})
    .then((sched)=>{
        var date = req.body.day;
        var prog = sched.time[date];
        prog[1] = req.body.m1;
        prog[2] = req.body.m2;
        prog[3] = req.body.m3;
        prog[4] = req.body.m4;
        console.log(sched);
        sched.save().then(()=>{
            res.redirect('/sch-up');
        })
    }).catch((err)=>{
        console.error(err)
    })
   };